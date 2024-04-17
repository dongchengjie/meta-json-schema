(function (global) {
  function init() {
    // 设置编辑器
    setupEditor();
    // 色设置点击事件
    setupEvents();
    // 根据参数加载schema
    let schema;
    try {
      const regex = /.*?schema=(.*)/gm;
      schema = regex.exec(window.location.href)[1];
    } catch {}
    if (schema) {
      fetch(schema)
        .then(response => response.text()) // 将响应内容转换为文本
        .then(text => JSON.stringify(JSON.parse(text), null, 2))
        .then(data => {
          sourceView();
          global.jsonEditor.getSession().setValue(data);
          setTimeout(() => visualizeView(), 100);
        })
        .catch(error => {
          global.jsonEditor.getSession().setValue(`Error fetch ${schema}: ${error}`);
        });
    }
  }

  function setupEditor() {
    global.jsonEditor = ace.edit('editor');
    global.jsonEditor.setTheme('ace/theme/chrome');
    global.jsonEditor.getSession().setMode('ace/mode/json');
    global.jsonEditor.setFontSize(16);
  }

  function setupEvents() {
    $('#sourceButton').click(sourceView);
    $('#visualizeButton').click(visualizeView);
  }

  function resetToolbar() {
    $('#app-toolbar button').attr('class', 'btn btn-default');
  }

  function sourceView() {
    resetToolbar();

    $('#sourceButton').attr('class', 'btn btn-primary active');

    $('#editor').css('display', 'block');

    global.jsonEditor.focus();
  }

  function visualizeView() {
    var schema = {};

    try {
      schema = JSON.parse(global.jsonEditor.getValue());
    } catch (e) {
      alert(e.toString());
      return;
    }

    NProgress.start();

    resetToolbar();

    $('#visualizeButton').attr('class', 'btn btn-primary active');

    $('#editor').css('display', 'none');

    $('#main-body').empty();

    $RefParser
      .dereference(schema)
      .then(function (resolvedSchema) {
        //Prevent circular references.
        resolvedSchema = JSON.parse(stringify(resolvedSchema));
        JSV.init(
          {
            plain: true,
            schema: resolvedSchema,
            viewerHeight: $('#main-body').height(),
            viewerWidth: $('#main-body').width()
          },
          function () {
            $('#jsv-tree').css('width', '100%');
            JSV.resizeViewer();
          }
        );
        NProgress.done();
      })
      .catch(function (err) {
        alert(err);
        NProgress.done();
      });
  }

  /* json-stringify-safe*/
  function stringify(obj, replacer, spaces, cycleReplacer) {
    return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
  }

  function serializer(replacer, cycleReplacer) {
    var stack = [],
      keys = [];

    if (cycleReplacer == null)
      cycleReplacer = function (key, value) {
        if (stack[0] === value) return '[Circular ~]';
        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
      };

    return function (key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
      } else stack.push(value);

      return replacer == null ? value : replacer.call(this, key, value);
    };
  }

  $(init);
})(window);
