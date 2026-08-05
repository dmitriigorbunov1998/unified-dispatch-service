interface SettingsProps {
  title: string;
}

export const Settings = ({ title }: SettingsProps) => {
  return <div className="settings">{title}</div>;
};
