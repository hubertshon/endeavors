

export const Dropdown = (props) => {

    return (
        <div>
            {props.items.map((prop) => {
                return (
                    <div>
                        <span>{prop.name}</span>
                    </div>
                )
            })}
        </div>
    )

}
