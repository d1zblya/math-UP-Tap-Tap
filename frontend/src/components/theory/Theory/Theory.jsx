import "./Theory.css";

const Theory = ({theory}) => {
    // Заменяем \n на <br />
    const formattedText = theory.text.replace(/\n/g, "<br />");

    return (
        <div className="Theory">
            <span className="theory-title">{theory.title}</span>
            <div
                className="theory-text"
                dangerouslySetInnerHTML={{__html: formattedText}} // Вставляем HTML
            />
        </div>
    );
};

export default Theory;