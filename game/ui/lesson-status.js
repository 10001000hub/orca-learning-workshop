// metadata.yamlのstatusを、学習者に見せる表示へ変換する（表示ポリシーなのでUI層に置く）。
// published以外（未設定・未知の値を含む）は必ず「公開前」として扱い、完成教材に見せない。
const LessonStatus = (() => {
  const KNOWN_STATUSES = ["draft", "review", "published"];

  function describe(status) {
    if (status === "published") {
      return { isPublished: true, label: "公開済み", notice: "" };
    }
    if (status === "review") {
      return {
        isPublished: false,
        label: "レビュー中",
        notice: "この教材はレビュー中です。Windows実機での確認が終わるまで、手順や画面の説明が変わる可能性があります。",
      };
    }
    return {
      isPublished: false,
      label: "下書き",
      notice: "この教材は下書き（未検証）です。Windows実機と初心者による通し確認がまだ終わっていないため、画面の見た目や手順が説明と異なる場合があります。",
    };
  }

  return { KNOWN_STATUSES, describe };
})();

if (typeof module !== "undefined" && module.exports) module.exports = LessonStatus;
