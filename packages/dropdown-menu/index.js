import { use } from '../utils';
import { BLUE } from '../utils/color';

const [sfc, bem] = use('dropdown-menu');

export default sfc({
  props: {
    zIndex: {
      type: Number,
      default: 10
    },
    activeColor: {
      type: String,
      default: BLUE
    }
  },

  provide() {
    return {
      vanDropdownMenu: this
    };
  },

  data() {
    return {
      top: 0,
      items: []
    };
  },

  methods: {
    toggleItem(active) {
      const { menu } = this.$refs;
      const rect = menu.getBoundingClientRect();
      this.top = rect.y + rect.height;

      this.items.forEach((item, index) => {
        if (index === active) {
          item.toggle();
        } else {
          item.toggle(false);
        }
      });
    }
  },

  render(h) {
    const Titles = this.items.map((item, index) => (
      <div
        class={bem('item')}
        onClick={() => {
          this.toggleItem(index);
        }}
      >
        <span
          class={bem('title', { active: item.show })}
          style={{ color: item.show ? this.activeColor : '' }}
        >
          {item.displayTitle}
        </span>
      </div>
    ));

    return (
      <div ref="menu" class={[bem(), 'van-hairline--top-bottom']}>
        {Titles}
        {this.slots('default')}
      </div>
    );
  }
});
