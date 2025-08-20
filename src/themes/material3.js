/* Material 3 theme for JSON Editor
   - Class prefix: m3-
   - Tokenized via --md-sys-* CSS variables (see material3.css)
   - Works with vanilla JSON Editor (no framework deps)

   Usage:
     <link rel="stylesheet" href="/assets/material3.css">
     <script src="/assets/material3.js"></script>
     <script type="module">
       import JSONEditor from '@json-editor/json-editor';
       const editor = new JSONEditor(document.getElementById('editor_holder'), {
         schema,
         theme: 'material3'
       });
     </script>
*/
(function () {
  if (typeof window === 'undefined' || !window.JSONEditor) return;
  const Base = window.JSONEditor.AbstractTheme;

  class Material3Theme extends Base {
    getTheme() { return 'material3'; }

    /* ----- Containers & panels ------------------------------------------- */
    getContainer() {
      const el = document.createElement('div');
      el.className = 'm3-container';
      return el;
    }

    getIndentedPanel() {
      const el = document.createElement('div');
      el.className = 'm3-card m3-panel';
      return el;
    }

    getTopIndentedPanel() {
      const el = document.createElement('div');
      el.className = 'm3-card m3-panel m3-panel--top';
      return el;
    }

    getHeader(text) {
      const h = document.createElement('div');
      h.className = 'm3-header';
      h.textContent = text;
      return h;
    }

    getHeaderButtonHolder() {
      const h = document.createElement('div');
      h.className = 'm3-header-actions';
      return h;
    }

    /* ----- Fields & labels ------------------------------------------------ */
    getFormInputLabel(text) {
      const label = document.createElement('label');
      label.className = 'm3-label';
      label.textContent = text;
      return label;
    }

    getFormInputDescription(text) {
      const desc = document.createElement('div');
      desc.className = 'm3-supporting-text';
      desc.textContent = text;
      return desc;
    }

    getFormControl(label, input, description) {
      const wrap = document.createElement('div');
      wrap.className = 'm3-field';

      if (label) {
        // Connect label to input
        if (input && !input.id) input.id = `m3-${Math.random().toString(36).slice(2)}`;
        if (input && input.id) label.setAttribute('for', input.id);
        wrap.appendChild(label);
      }

      const control = document.createElement('div');
      control.className = 'm3-control';
      if (input) control.appendChild(input);
      if (description) control.appendChild(description);

      wrap.appendChild(control);
      return wrap;
    }

    /* ----- Inputs --------------------------------------------------------- */
    getFormInputField(type) {
      const input = document.createElement('input');
      input.type = type || 'text';
      input.className = 'm3-input';
      return input;
    }

    getTextareaInput() {
      const el = document.createElement('textarea');
      el.className = 'm3-textarea';
      el.rows = 3;
      return el;
    }

    getRangeInput(min, max, step) {
      const input = this.getFormInputField('range');
      input.classList.add('m3-range');
      if (min != null) input.min = String(min);
      if (max != null) input.max = String(max);
      if (step != null) input.step = String(step);
      return input;
    }

    getSelectInput(options) {
      const sel = document.createElement('select');
      sel.className = 'm3-select';
      if (Array.isArray(options)) {
        options.forEach(o => {
          const opt = document.createElement('option');
          if (typeof o === 'object') {
            opt.value = o.value;
            opt.textContent = o.text || o.value;
          } else {
            opt.value = String(o);
            opt.textContent = String(o);
          }
          sel.appendChild(opt);
        });
      }
      return sel;
    }

    getCheckbox() {
      const input = this.getFormInputField('checkbox');
      input.className = 'm3-checkbox';
      return input;
    }

    getRadio() {
      const input = this.getFormInputField('radio');
      input.className = 'm3-radio';
      return input;
    }

    /* ----- Arrays, tables, tabs ------------------------------------------ */
    getTable() {
      const table = document.createElement('table');
      table.className = 'm3-table';
      table.createTHead().className = 'm3-table-head';
      table.createTBody().className = 'm3-table-body';
      return table;
    }

    getTableRow() { return document.createElement('tr'); }

    getTableHeaderCell(text) {
      const th = document.createElement('th');
      th.className = 'm3-th';
      th.textContent = text;
      return th;
    }

    getTableCell() {
      const td = document.createElement('td');
      td.className = 'm3-td';
      return td;
    }

    getTabHolder() {
      const wrap = document.createElement('div');
      wrap.className = 'm3-tabs';
      const tabs = document.createElement('div');
      tabs.className = 'm3-tabs__nav';
      const content = document.createElement('div');
      content.className = 'm3-tabs__content';
      wrap.appendChild(tabs);
      wrap.appendChild(content);
      // JSONEditor expects these handles
      wrap.tabs = tabs;
      wrap.content = content;
      return wrap;
    }

    getTab(text, tabId) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'm3-tab';
      btn.textContent = text;
      btn.setAttribute('data-tab', tabId);
      return btn;
    }

    getTabContent() {
      const panel = document.createElement('div');
      panel.className = 'm3-tab-panel';
      return panel;
    }

    markTabActive(tab) { tab.classList.add('is-active'); }
    markTabInactive(tab) { tab.classList.remove('is-active'); }
    markTabContentActive(panel) { panel.classList.add('is-active'); }
    markTabContentInactive(panel) { panel.classList.remove('is-active'); }

    /* ----- Buttons -------------------------------------------------------- */
    getButton(text, icon, title) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'm3-button';
      if (title) btn.title = title;
      this.setButtonText(btn, text, icon, title);
      return btn;
    }

    getPrimaryButton(text, icon, title) {
      const btn = this.getButton(text, icon, title);
      btn.classList.add('m3-button--filled');
      return btn;
    }

    getSmallButton(text, icon, title) {
      const btn = this.getButton(text, icon, title);
      btn.classList.add('m3-button--small');
      return btn;
    }

    setButtonText(btn, text /*, icon */) {
      btn.textContent = text || '';
    }

    /* ----- Error & help states ------------------------------------------- */
    addInputError(input, text) {
      if (!input) return;
      input.classList.add('is-invalid');

      // Find or create sibling error element
      let err = input.parentNode && input.parentNode.querySelector('.m3-error');
      if (!err) {
        err = document.createElement('div');
        err.className = 'm3-error';
        if (input.parentNode) input.parentNode.appendChild(err);
      }
      err.textContent = text || 'Invalid value';
    }

    removeInputError(input) {
      if (!input) return;
      input.classList.remove('is-invalid');
      const p = input.parentNode;
      if (!p) return;
      const err = p.querySelector('.m3-error');
      if (err) err.remove();
    }

    getFormCheckboxControl(label, input, description) {
      // Better layout for single checkbox fields
      const wrap = document.createElement('div');
      wrap.className = 'm3-field m3-field--checkbox';
      const row = document.createElement('label');
      row.className = 'm3-checkbox-row';
      row.appendChild(input);
      if (label) {
        label.classList.add('m3-label');
        row.appendChild(label);
      }
      wrap.appendChild(row);
      if (description) wrap.appendChild(description);
      return wrap;
    }

    /* ----- Grid ----------------------------------------------------------- */
    setGridColumnSize(el, size) {
      el.classList.remove(...Array.from(el.classList).filter(c => c.startsWith('m3-col-')));
      el.classList.add(`m3-col-${Math.max(1, Math.min(12, size || 12))}`);
    }

    getGridContainer() {
      const el = document.createElement('div');
      el.className = 'm3-grid';
      return el;
    }

    getGridRow() {
      const el = document.createElement('div');
      el.className = 'm3-row';
      return el;
    }

    getGridColumn() {
      const el = document.createElement('div');
      el.className = 'm3-col-12';
      return el;
    }

    /* ----- Icons ---------------------------------------------------------- */
    getIcon(/* name */) {
      // No embedded icon set; rely on text & CSS.
      // If you use Material Symbols, you can override this to inject <span class="material-symbols-rounded">...</span>
      return null;
    }
  }

  // Register the theme
  window.JSONEditor.defaults.themes['material3'] = Material3Theme;
})();
