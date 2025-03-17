import "./TheoryPage.css"
import TheoryModule from "../../components/theory/TheoryModule/TheoryModule.jsx";
import {useState} from "react";

const THEORY = [
    {
        "title": "Сложение",
        "text": "ЭЭЭЭ НУ КАРОЧЕ БЕРЕШЬ ЧИСЛО ЕГО К ДРУГОМУ ПРИСОБАЧИВАЕШЬ И ОАОВЫЛДАВЫАРЫВОАЛДЖ ФУФЕЛШМЕРЦ"
    },
    {
        "title": "Вычитание",
        "text": "ЭЭЭЭ НУ КАРОЧЕ БЕРЕШЬ ЧИСЛО ЕГО К ДРУГОМУ ПРИСОБАЧИВАЕШЬ И ОАОВЫЛДАВЫАРЫВОАЛДЖ ФУФЕЛШМЕРЦ"
    },
    {
        "title": "ЧООЧОЧ",
        "text": "ЭЭЭЭ НУ КАРОЧЕ БЕРЕШЬ ЧИСЛО ЕГО К ДРУГОМУ ПРИСОБАЧИВАЕШЬ И ОАОВЫЛДАВЫАРЫВОАЛДЖ ФУФЕЛШМЕРЦ"
    }
]

function TheoryPage() {
    const [theory, setTheory] = useState(null);


    return (
        <div className="TheoryPage">
            {THEORY.map((item, index) => (
                <TheoryModule title={item.title} text={index.text} setTheory={setTheory}/>
            ))}
        </div>
    )
}

export default TheoryPage;