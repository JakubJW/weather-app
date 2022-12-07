function DataDisplay(props) {
  return (
    <div className="flex w-3/6 justify-start rounded-xl">
      <div className="box-border flex items-center gap-4 p-4">
        <>{props.icon}</>
        <div className="flex flex-col">
          <p>{props.value}</p>
          <p>{props.valueName}</p>
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;
