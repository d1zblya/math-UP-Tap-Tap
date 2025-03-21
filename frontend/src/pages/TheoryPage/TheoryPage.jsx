import "./TheoryPage.css"
import TheoryModule from "../../components/theory/TheoryModule/TheoryModule.jsx";
import {useState} from "react";
import Theory from "../../components/theory/Theory/Theory.jsx";

function findTheoryByTitle(array, targetTitle) {
    return array.find(item => item.title === targetTitle);
}

const theory = [
    {
        "title": "Сложение и вычитание",
        "text": "Сложение объединяет числа:\n5 + 3 = 8. \n Вычитание — обратная операция:\n8 - 3 = 5.\nСвойства:\n- Переместительное (5 + 3 = 3 + 5) \n - Сочетательное ((2 + 3) + 4 = 2 + (3 + 4))."
    },
    {
        "title": "Умножение и деление",
        "text": "Умножение — это повторяющееся сложение:\n3 × 4 = 3 + 3 + 3 + 3 = 12.\nДеление — обратное действие:\n12 ÷ 4 = 3.\nСвойства:\nПереместительное (2 × 3 = 3 × 2)\nРаспределительное (2 × (3 + 4) = 2 × 3 + 2 × 4)."
    },
    {
        "title": "Дроби",
        "text": "Дробь записывается как a/b.\nПример: 3/4 значит, что 3 части из 4.\nОсновное свойство дроби:\n3/4 = 6/8 (если умножить числитель и знаменатель на 2).\nСложение дробей:\n1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2."
    },
    {
        "title": "Проценты",
        "text": "Процент — это сотая часть числа.\n20% от 150: (20 × 150) / 100 = 30. \nПеревод дроби в проценты:\n3/5 = (3 ÷ 5) × 100% = 60%."
    },
    {
        "title": "Степени и корни",
        "text": "Степень a^n означает a, умноженное само на себя n раз: 2^3 = 2 × 2 × 2 = 8.\nКорень: √9 = 3, так как 3 × 3 = 9\nСвойство: (√a)^2 = a."
    },
    {
        "title": "Линейные уравнения",
        "text": "Уравнение ax + b = 0 решается переносом:\n2x + 5 = 9 → 2x = 9 - 5 → 2x = 4 → x = 4/2 → x = 2."
    },
    {
        "title": "Квадратные уравнения",
        "text": "Решение уравнения ax² + bx + c = 0 по формуле:\nx = (-b ± √(b² - 4ac)) / 2a.\nПример: x² - 5x + 6 = 0.\nНайдем дискриминант: D = (-5)² - 4×1×6 = 25 - 24 = 1.\nКорни: x = (5 ± 1)/2 → x = 3 или x = 2."
    },
    {
        "title": "Тригонометрия",
        "text": "Основные функции: sin, cos, tan.\nПример: sin(30°) = 1/2, cos(60°) = 1/2, tan(45°) = 1.\nОсновное тригонометрическое тождество: sin²x + cos²x = 1."
    },
    {
        "title": "Теорема Пифагора",
        "text": "В прямоугольном треугольнике a² + b² = c².\nПример: если a = 3, b = 4, то c² = 3² + 4² = 9 + 16 = 25, значит c = √25 = 5."
    },
    {
        "title": "Площадь и объем",
        "text": "Площадь прямоугольника: S = a × b. Пример: S = 5 × 4 = 20. Объем параллелепипеда: V = a × b × c. Пример: V = 2 × 3 × 4 = 24."
    }
];

function TheoryPage() {
    const [currentTheory, setCurrentTheory] = useState(null);

    if (!currentTheory) {
        return (
            <div className="theory-selector">
                {theory.map((item, index) => (
                    <TheoryModule title={item.title} text={index.text} setCurrentTheory={setCurrentTheory}/>
                ))}
            </div>
        )
    } else {
        return (
            <div className="TheoryPage">
                <Theory theory={findTheoryByTitle(theory, currentTheory)}/>
            </div>
        )
    }
}

export default TheoryPage;