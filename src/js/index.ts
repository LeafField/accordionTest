import "../styles/style.scss";

const animTiming: KeyframeAnimationOptions = {
  duration: 400,
  easing: "ease-in-out",
};

const closeAnimation = (content: HTMLElement): Keyframe[] => [
  {
    height: content.offsetHeight + "px",
  },
  {
    height: 0,
  },
];

const openAnimation = (content: HTMLElement): Keyframe[] => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];

// アコーディオンの取得
const details = document.querySelectorAll(
  ".js-details"
) as NodeListOf<HTMLDetailsElement>;

// アニメーション操作に必要な変数を定義
const RUNNING_VALUE = "running";
const IS_OPEN_CLASS = "is-opened";

console.log("javascript is runnning");
details.forEach((element) => {
  const summary = element.querySelector(".js-summary") as HTMLElement;
  const content = element.querySelector(".js-content") as HTMLElement;

  summary.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    if (element.dataset.animStatus === RUNNING_VALUE) return;

    if (element.open) {
      element.classList.remove(IS_OPEN_CLASS);
      const closing = content.animate(closeAnimation(content), animTiming);
      element.dataset.animStatus = RUNNING_VALUE;

      closing.onfinish = () => {
        element.removeAttribute("open");
        element.dataset.animStatus = "";
      };
    } else {
      element.setAttribute("open", "true");
      element.classList.add(IS_OPEN_CLASS);
      const openning = content.animate(openAnimation(content), animTiming);
      element.dataset.animStatus = RUNNING_VALUE;
      openning.onfinish = () => {
        element.dataset.animStatus = "";
      };
    }
  });
});
