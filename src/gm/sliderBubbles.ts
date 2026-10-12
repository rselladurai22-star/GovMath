/**
 * Value bubbles under slider thumbs (the take-home pay design trial,
 * .gm-tryout). The page scripts set each slider's fill as --fill on the
 * range input; this copies it to the field so the field's number box can
 * sit under the thumb.
 */
export function initSliderBubbles(root: ParentNode = document) {
  root.querySelectorAll<HTMLInputElement>(".gm-tryout input[type=range]").forEach((range) => {
    const field = range.closest<HTMLElement>(".field");
    if (!field) return;
    const copy = () => {
      const fill = range.style.getPropertyValue("--fill");
      if (fill) field.style.setProperty("--fill", fill);
    };
    copy();
    new MutationObserver(copy).observe(range, { attributes: true, attributeFilter: ["style"] });
  });
}
