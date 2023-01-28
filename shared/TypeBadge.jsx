export default function TypeBadge({ type }) {
  const classes = 'px-2 py-0.5 rounded-xl text-xs text-gray-800';
  if (type === 'blog') {
    return <span className={`${classes} bg-green-100`}>博客</span>;
  }
  return null;
}
