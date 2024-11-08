const Icon = ({ name, width = 16, height = 16, fill = "currentColor" }) => (
  <svg width={width} height={height} fill={fill}>
    <use xlinkHref={`/icons/icons.svg#${name}`} />
  </svg>
);

export default Icon;
