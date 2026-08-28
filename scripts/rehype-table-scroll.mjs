// Wraps every Markdown table in a keyboard-focusable scroll region, so a
// table wider than a phone screen can be scrolled without a pointer and
// passes WCAG 2.1 keyboard checks (axe: scrollable-region-focusable).
export default function rehypeTableScroll() {
  return function transform(tree) {
    walk(tree);
  };
}

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroll'],
          tabIndex: 0,
          role: 'region',
          ariaLabel: 'Table, scrollable',
        },
        children: [child],
      };
    }
    walk(child);
    return child;
  });
}
