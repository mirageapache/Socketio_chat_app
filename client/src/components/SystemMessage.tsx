interface SysMessage {
  username: string;
  date: string;
  time: string;
  state: string;
}

function SystemMessage(prop: { data: SysMessage }) {
  const { username, date, time, state } = prop.data;
  return (
    <div className="system-message">
      <p>
        {date} {time} <b> '{username}' </b> {state}
      </p>
    </div>
  );
}

export default SystemMessage;
