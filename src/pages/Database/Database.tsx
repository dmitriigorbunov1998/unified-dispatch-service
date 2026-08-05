interface DatabaseProps {
  title: string;
}

export const Database = ({ title }: DatabaseProps) => {
  return <div className="database">{title}</div>;
};
