function DataDisplay(props) {
    

    return (
        <div className="flex rounded-xl w-2/5">
            <div className="flex gap-4 items-center p-4 box-border">
                <>{props.icon}</>
                <div className="flex flex-col">
                    <p>{props.value}</p>
                    <p>{props.valueName}</p>    
                </div> 
            </div>
        </div>
    ) 
}

export default DataDisplay