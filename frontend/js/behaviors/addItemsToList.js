import createBehavior from '../functions/createBehavior';

const addItemsToList = createBehavior(
  'addItemsToList',
  {
    addItems(e) {
      e.preventDefault();
      this.$trigger.removeEventListener('click', this.addItems);
      this.node.removeChild(this.$trigger);
      const li = '<li><span><img data-src="/images/greenflash_800.jpg"></span></li>';
      const html = li + li + li + li + li + li + li + li + li + li + li + li;
      this.$target.innerHTML = html;
      document.dispatchEvent(new CustomEvent('page:updated'));
    },
  },
  {
    init() {
      this.$trigger = this.getChild('trigger');
      this.$target = this.getChild('target');
      this.$trigger.addEventListener('click', this.addItems);
    },
    destroy() {
      if (this.$trigger) {
        this.$trigger.removeEventListener('click', this.addItems);
      }
    },
  }
);

export default addItemsToList;
