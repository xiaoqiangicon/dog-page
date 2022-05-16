import EasyTyper from 'easy-typer-js';

let typeA = null;
export default {
  name: 'HelloWorld',
  data() {
    return {
      id: '',
      pageAoutput: ``,
      pageATyper: {
        output: '',
        isEnd: false,
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageALoaded: false,

      pageBLoaded: false,
    }
  },
  created() {
    this.renderId();
  },
  mounted() {
    this.pageAInit();
    // this.pageAfun().then(() => {
    //   this.pageBfun()
    // });
  },
  beforeDestroy() {
    typeA = null;
  },
  methods: {
    init() {
      this.pageAInit();
      this.pageBInit();
    },
    pageAInit() {
      this.pageALoaded = false;
      this.$refs.pageA.style.opacity = 1;
      this.$refs.pageA.style.zIndex = 999;
      this.initPageAType();
    },
    initPageAType() {
      typeA = new EasyTyper(this.pageATyper, this.pageAoutput, this.pageAOnloaded)
    },
    pageAOnloaded() {
      this.pageALoaded = true;
    },
    pageAClick() {
      if (!this.pageALoaded) return;
      this.pageAfun()
    },
    pageBInit() {
      this.pageBLoaded = false;
      this.$refs.pageB.style.opacity = 1;
      this.$refs.pageB.style.zIndex = 998;
    },
    clickNailCheck() {
      console.log('clickB')
    },
    pageCInit() {
      this.$refs.pageC.style.opacity = 1;
      this.$refs.pageC.style.zIndex = 997;
    },
    
    async pageAfun() {
      await this.transition(this.$refs.pageA, {
        time: 1000,
        style: {
          opacity: 0,
          zIndex: 0
        }
      })
    },
    async pageBfun() {
      await this.transition(this.$refs.pageB, {
        time: 1000,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
    },
    clickA() {
      typeA.close();
      this.typeAclose = !0;
    },
    transition (el, options) {
      return new Promise((resolve, reject) => {
        resolve(window.Velocity(el, options.style, options.time))
      })
    },
    renderId() {
      let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z'];
      let firstNumber = Math.floor(Math.random()* 26)
      let first = letters[firstNumber];
      let secondNumber = Math.floor(Math.random()* 26)
      let second = letters[secondNumber];
      
      let number = Math.floor(Math.random() * 10000);
      this.id = first + second + number;
      this.pageAoutput = `Hi!?你已成功被选为本次100%BEATS号移⺠计划的⼀员，你的ID是：${this.id}`;
      console.log(firstNumber, secondNumber)
    },
  },
}