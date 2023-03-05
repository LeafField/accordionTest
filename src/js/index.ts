import "../styles/style.scss";

// animate関数第二引数のオプション
const animTiming: KeyframeAnimationOptions = {
  duration: 400,
  easing: "ease-in-out",
};

// animate関数第一引数のオブジェクトの配列を返す関数
// アコーディオンを閉じる
const closeAnimation = (content: HTMLElement): Keyframe[] => [
  {
    height: content.offsetHeight + "px",
  },
  {
    height: 0,
  },
];
// アコーディオンを開く
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

// 各アコーディオンを展開
details.forEach((element) => {
  // 各アコーディオンの中の要素を取得
  const summary = element.querySelector(".js-summary") as HTMLElement;
  const content = element.querySelector(".js-content") as HTMLElement;

  // summaryタグにクリックイベント
  summary.addEventListener("click", (event: MouseEvent) => {
    // デフォルトの挙動を停止
    event.preventDefault();
    // アニメーション中は入力拒否
    if (element.dataset.animStatus === RUNNING_VALUE) return;

    // アコーディオンが開いている時の動作
    if (element.open) {
      // is-ipenedクラスの除去
      element.classList.remove(IS_OPEN_CLASS);
      // アニメーションの実行
      const closing = content.animate(closeAnimation(content), animTiming);
      // data-anim-statusにrunningを付与することで最初の条件分岐によってアニメーション中の入力を拒否
      element.dataset.animStatus = RUNNING_VALUE;

      // アニメーションが終わった時
      closing.onfinish = () => {
        // アコーディオンのオープン属性を除去
        element.removeAttribute("open");
        // data-anim-statusを空にすることで入力受付を開始
        element.dataset.animStatus = "";
      };
    } else {
      // 以下開ける時の処理
      // 開ける時は最初にopen属性にtrueを入れる
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
