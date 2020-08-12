import React from 'react';

type Props = {
  label: string;
  symbol: string;
}

export default function Emoji(props: Props): React.Element<typeof Component> {
  return(
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
}
