import { ReactComponent as IconLoading } from "assets/icons/loading.svg";

function Loading() {
  return (
    <div className="loading-div">
      <h1>
        <IconLoading className="icon loading" />
        系統連線中，請稍候
      </h1>
    </div>
  );
}

export default Loading;
