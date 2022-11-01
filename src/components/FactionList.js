import ElementButton from "./ElementButton";
/**
 * 
 * props: 
 *  chosenFactions - string array
 *  typed - string
 *  onClickFunc - function to be called on button click
 */

function FactionList(props) {

    //base faction list
    let factionList = ["Muatt", "Sol", "Sardakk Norr"];

    //filter out already chosen factions
    factionList = factionList.filter((element) => {return !props.chosenFactions.includes(element)})

    //filter out based on what is in the type box
    factionList = factionList.filter((element) => {return element.toLocaleLowerCase().includes(props.typed ? props.typed.toLocaleLowerCase() : props.typed)});

    return (
        <div id="popup-faction-list">
            {factionList.map(item => {
                    return <ElementButton key={Math.random()} onClickHandler={props.onClickFunc} title={item}/>
                })}
        </div>
    )
    
}

export default FactionList;