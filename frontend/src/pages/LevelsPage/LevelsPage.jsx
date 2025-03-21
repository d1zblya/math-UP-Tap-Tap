import "./LevelsPage.css"
import LevelRow from "../../components/levels/LevelRow/LevelRow.jsx";
import React, {useEffect, useState} from "react";
import PlayLevel from "../../components/levels/PlayLevel/PlayLevel.jsx";
import {shuffleArray} from "../../utils.js";

const levels = [
    [
        {
            "level": 1,
            "expression": "2 + 3",
            "expression_latex": "2 + 3",
            "answers": [5]
        },
        {
            "level": 1,
            "expression": "5 - 1",
            "expression_latex": "5 - 1",
            "answers": [4]
        },
        {
            "level": 1,
            "expression": "4 * 2",
            "expression_latex": "4 \\cdot 2",
            "answers": [8]
        },
        {
            "level": 1,
            "expression": "6 / 3",
            "expression_latex": "6 \\div 3",
            "answers": [2]
        },
        {
            "level": 1,
            "expression": "7 + 2",
            "expression_latex": "7 + 2",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "9 - 4",
            "expression_latex": "9 - 4",
            "answers": [5]
        },
        {
            "level": 1,
            "expression": "3 * 3",
            "expression_latex": "3 \\cdot 3",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "8 / 2",
            "expression_latex": "8 \\div 2",
            "answers": [4]
        },
        {
            "level": 1,
            "expression": "1 + 8",
            "expression_latex": "1 + 8",
            "answers": [9]
        },
        {
            "level": 1,
            "expression": "10 - 5",
            "expression_latex": "10 - 5",
            "answers": [5]
        }
    ],
    [
        {
            "level": 2,
            "expression": "12 + 5",
            "expression_latex": "12 + 5",
            "answers": [17]
        },
        {
            "level": 2,
            "expression": "20 - 7",
            "expression_latex": "20 - 7",
            "answers": [13]
        },
        {
            "level": 2,
            "expression": "6 * 4",
            "expression_latex": "6 \\cdot 4",
            "answers": [24]
        },
        {
            "level": 2,
            "expression": "18 / 3",
            "expression_latex": "18 \\div 3",
            "answers": [6]
        },
        {
            "level": 2,
            "expression": "15 + 4",
            "expression_latex": "15 + 4",
            "answers": [19]
        },
        {
            "level": 2,
            "expression": "25 - 10",
            "expression_latex": "25 - 10",
            "answers": [15]
        },
        {
            "level": 2,
            "expression": "7 * 3",
            "expression_latex": "7 \\cdot 3",
            "answers": [21]
        },
        {
            "level": 2,
            "expression": "24 / 4",
            "expression_latex": "24 \\div 4",
            "answers": [6]
        },
        {
            "level": 2,
            "expression": "30 + 10",
            "expression_latex": "30 + 10",
            "answers": [40]
        },
        {
            "level": 2,
            "expression": "40 - 15",
            "expression_latex": "40 - 15",
            "answers": [25]
        }
    ],
    [
        {
            "level": 3,
            "expression": "17 + 8",
            "expression_latex": "17 + 8",
            "answers": [25]
        },
        {
            "level": 3,
            "expression": "25 - 9",
            "expression_latex": "25 - 9",
            "answers": [16]
        },
        {
            "level": 3,
            "expression": "6 * 5",
            "expression_latex": "6 \\cdot 5",
            "answers": [30]
        },
        {
            "level": 3,
            "expression": "36 / 6",
            "expression_latex": "36 \\div 6",
            "answers": [6]
        },
        {
            "level": 3,
            "expression": "28 + 7",
            "expression_latex": "28 + 7",
            "answers": [35]
        },
        {
            "level": 3,
            "expression": "40 - 12",
            "expression_latex": "40 - 12",
            "answers": [28]
        },
        {
            "level": 3,
            "expression": "8 * 4",
            "expression_latex": "8 \\cdot 4",
            "answers": [32]
        },
        {
            "level": 3,
            "expression": "45 / 5",
            "expression_latex": "45 \\div 5",
            "answers": [9]
        },
        {
            "level": 3,
            "expression": "33 + 9",
            "expression_latex": "33 + 9",
            "answers": [42]
        },
        {
            "level": 3,
            "expression": "50 - 18",
            "expression_latex": "50 - 18",
            "answers": [32]
        }
    ],
    [
        {
            "level": 4,
            "expression": "12 * 3",
            "expression_latex": "12 \\cdot 3",
            "answers": [36]
        },
        {
            "level": 4,
            "expression": "48 / 4",
            "expression_latex": "48 \\div 4",
            "answers": [12]
        },
        {
            "level": 4,
            "expression": "15 * 2",
            "expression_latex": "15 \\cdot 2",
            "answers": [30]
        },
        {
            "level": 4,
            "expression": "60 / 5",
            "expression_latex": "60 \\div 5",
            "answers": [12]
        },
        {
            "level": 4,
            "expression": "22 * 3",
            "expression_latex": "22 \\cdot 3",
            "answers": [66]
        },
        {
            "level": 4,
            "expression": "72 / 6",
            "expression_latex": "72 \\div 6",
            "answers": [12]
        },
        {
            "level": 4,
            "expression": "18 * 4",
            "expression_latex": "18 \\cdot 4",
            "answers": [72]
        },
        {
            "level": 4,
            "expression": "84 / 7",
            "expression_latex": "84 \\div 7",
            "answers": [12]
        },
        {
            "level": 4,
            "expression": "25 * 3",
            "expression_latex": "25 \\cdot 3",
            "answers": [75]
        },
        {
            "level": 4,
            "expression": "90 / 9",
            "expression_latex": "90 \\div 9",
            "answers": [10]
        }
    ],
    [
        {
            "level": 5,
            "expression": "x + 5 = 12",
            "expression_latex": "x + 5 = 12",
            "answers": [7]
        },
        {
            "level": 5,
            "expression": "x - 3 = 7",
            "expression_latex": "x - 3 = 7",
            "answers": [10]
        },
        {
            "level": 5,
            "expression": "2x = 10",
            "expression_latex": "2x = 10",
            "answers": [5]
        },
        {
            "level": 5,
            "expression": "x / 4 = 3",
            "expression_latex": "x \\div 4 = 3",
            "answers": [12]
        },
        {
            "level": 5,
            "expression": "x + 8 = 15",
            "expression_latex": "x + 8 = 15",
            "answers": [7]
        },
        {
            "level": 5,
            "expression": "x - 6 = 9",
            "expression_latex": "x - 6 = 9",
            "answers": [15]
        },
        {
            "level": 5,
            "expression": "3x = 18",
            "expression_latex": "3x = 18",
            "answers": [6]
        },
        {
            "level": 5,
            "expression": "x / 5 = 4",
            "expression_latex": "x \\div 5 = 4",
            "answers": [20]
        },
        {
            "level": 5,
            "expression": "x + 10 = 20",
            "expression_latex": "x + 10 = 20",
            "answers": [10]
        },
        {
            "level": 5,
            "expression": "x - 7 = 13",
            "expression_latex": "x - 7 = 13",
            "answers": [20]
        },
    ],
    [
        {
            "level": 6,
            "expression": "1/2 + 1/2",
            "expression_latex": "\\frac{1}{2} + \\frac{1}{2}",
            "answers": [1]
        },
        {
            "level": 6,
            "expression": "3/4 - 1/4",
            "expression_latex": "\\frac{3}{4} - \\frac{1}{4}",
            "answers": [0.5]
        },
        {
            "level": 6,
            "expression": "2/3 * 3",
            "expression_latex": "\\frac{2}{3} \\cdot 3",
            "answers": [2]
        },
        {
            "level": 6,
            "expression": "5/6 / 1/2",
            "expression_latex": "\\frac{5}{6} \\div \\frac{1}{2}",
            "answers": [1.6667]
        },
        {
            "level": 6,
            "expression": "1/3 + 1/6",
            "expression_latex": "\\frac{1}{3} + \\frac{1}{6}",
            "answers": [0.5]
        },
        {
            "level": 6,
            "expression": "4/5 - 2/5",
            "expression_latex": "\\frac{4}{5} - \\frac{2}{5}",
            "answers": [0.4]
        },
        {
            "level": 6,
            "expression": "3/8 * 4",
            "expression_latex": "\\frac{3}{8} \\cdot 4",
            "answers": [1.5]
        },
        {
            "level": 6,
            "expression": "7/10 / 1/5",
            "expression_latex": "\\frac{7}{10} \\div \\frac{1}{5}",
            "answers": [3.5]
        },
        {
            "level": 6,
            "expression": "2/7 + 3/7",
            "expression_latex": "\\frac{2}{7} + \\frac{3}{7}",
            "answers": [0.7143]
        },
        {
            "level": 6,
            "expression": "9/12 - 1/3",
            "expression_latex": "\\frac{9}{12} - \\frac{1}{3}",
            "answers": [0.4167]
        }
    ],
    [
        {
            "level": 7,
            "expression": "5 + (-3)",
            "expression_latex": "5 + (-3)",
            "answers": [2]
        },
        {
            "level": 7,
            "expression": "-7 - 2",
            "expression_latex": "-7 - 2",
            "answers": [-9]
        },
        {
            "level": 7,
            "expression": "-4 * 3",
            "expression_latex": "-4 \\cdot 3",
            "answers": [-12]
        },
        {
            "level": 7,
            "expression": "-15 / 5",
            "expression_latex": "-15 \\div 5",
            "answers": [-3]
        },
        {
            "level": 7,
            "expression": "-8 + 10",
            "expression_latex": "-8 + 10",
            "answers": [2]
        },
        {
            "level": 7,
            "expression": "-12 - (-5)",
            "expression_latex": "-12 - (-5)",
            "answers": [-7]
        },
        {
            "level": 7,
            "expression": "-6 * (-2)",
            "expression_latex": "-6 \\cdot (-2)",
            "answers": [12]
        },
        {
            "level": 7,
            "expression": "20 / (-4)",
            "expression_latex": "20 \\div (-4)",
            "answers": [-5]
        },
        {
            "level": 7,
            "expression": "-9 + (-3)",
            "expression_latex": "-9 + (-3)",
            "answers": [-12]
        },
        {
            "level": 7,
            "expression": "-18 - 7",
            "expression_latex": "-18 - 7",
            "answers": [-25]
        }
    ],
    [
        {
            "level": 8,
            "expression": "0.5 + 0.3",
            "expression_latex": "0.5 + 0.3",
            "answers": [0.8]
        },
        {
            "level": 8,
            "expression": "1.2 - 0.7",
            "expression_latex": "1.2 - 0.7",
            "answers": [0.5]
        },
        {
            "level": 8,
            "expression": "0.4 * 5",
            "expression_latex": "0.4 \\cdot 5",
            "answers": [2]
        },
        {
            "level": 8,
            "expression": "2.5 / 0.5",
            "expression_latex": "2.5 \\div 0.5",
            "answers": [5]
        },
        {
            "level": 8,
            "expression": "3.6 + 1.4",
            "expression_latex": "3.6 + 1.4",
            "answers": [5]
        },
        {
            "level": 8,
            "expression": "5.8 - 2.3",
            "expression_latex": "5.8 - 2.3",
            "answers": [3.5]
        },
        {
            "level": 8,
            "expression": "0.25 * 4",
            "expression_latex": "0.25 \\cdot 4",
            "answers": [1]
        },
        {
            "level": 8,
            "expression": "1.8 / 0.3",
            "expression_latex": "1.8 \\div 0.3",
            "answers": [6]
        },
        {
            "level": 8,
            "expression": "0.75 + 0.25",
            "expression_latex": "0.75 + 0.25",
            "answers": [1]
        },
        {
            "level": 8,
            "expression": "4.2 - 1.8",
            "expression_latex": "4.2 - 1.8",
            "answers": [2.4]
        }
    ],
    [
        {
            "level": 9,
            "expression": "20% of 50",
            "expression_latex": "20\\% \\times 50",
            "answers": [10]
        },
        {
            "level": 9,
            "expression": "15% of 200",
            "expression_latex": "15\\% \\times 200",
            "answers": [30]
        },
        {
            "level": 9,
            "expression": "50% of 80",
            "expression_latex": "50\\% \\times 80",
            "answers": [40]
        },
        {
            "level": 9,
            "expression": "25% of 120",
            "expression_latex": "25\\% \\times 120",
            "answers": [30]
        },
        {
            "level": 9,
            "expression": "10% of 150",
            "expression_latex": "10\\% \\times 150",
            "answers": [15]
        },
        {
            "level": 9,
            "expression": "75% of 60",
            "expression_latex": "75\\% \\times 60",
            "answers": [45]
        },
        {
            "level": 9,
            "expression": "30% of 90",
            "expression_latex": "30\\% \\times 90",
            "answers": [27]
        },
        {
            "level": 9,
            "expression": "5% of 400",
            "expression_latex": "5\\% \\times 400",
            "answers": [20]
        },
        {
            "level": 9,
            "expression": "40% of 250",
            "expression_latex": "40\\% \\times 250",
            "answers": [100]
        },
        {
            "level": 9,
            "expression": "12% of 300",
            "expression_latex": "12\\% \\times 300",
            "answers": [36]
        }
    ],
    [
        {
            "level": 10,
            "expression": "x/2 = 4",
            "expression_latex": "\\frac{x}{2} = 4",
            "answers": [8]
        },
        {
            "level": 10,
            "expression": "x/3 + 1 = 5",
            "expression_latex": "\\frac{x}{3} + 1 = 5",
            "answers": [12]
        },
        {
            "level": 10,
            "expression": "2x/5 = 4",
            "expression_latex": "\\frac{2x}{5} = 4",
            "answers": [10]
        },
        {
            "level": 10,
            "expression": "x/4 - 2 = 3",
            "expression_latex": "\\frac{x}{4} - 2 = 3",
            "answers": [20]
        },
        {
            "level": 10,
            "expression": "3x/7 = 6",
            "expression_latex": "\\frac{3x}{7} = 6",
            "answers": [14]
        },
        {
            "level": 10,
            "expression": "x/5 + 3 = 8",
            "expression_latex": "\\frac{x}{5} + 3 = 8",
            "answers": [25]
        },
        {
            "level": 10,
            "expression": "4x/9 = 8",
            "expression_latex": "\\frac{4x}{9} = 8",
            "answers": [18]
        },
        {
            "level": 10,
            "expression": "x/6 - 1 = 2",
            "expression_latex": "\\frac{x}{6} - 1 = 2",
            "answers": [18]
        },
        {
            "level": 10,
            "expression": "5x/10 = 10",
            "expression_latex": "\\frac{5x}{10} = 10",
            "answers": [20]
        },
        {
            "level": 10,
            "expression": "x/8 + 4 = 7",
            "expression_latex": "\\frac{x}{8} + 4 = 7",
            "answers": [24]
        }
    ],
    [
        {
            "level": 11,
            "expression": "sqrt(16)",
            "expression_latex": "\\sqrt{16}",
            "answers": [4]
        },
        {
            "level": 11,
            "expression": "sqrt(25)",
            "expression_latex": "\\sqrt{25}",
            "answers": [5]
        },
        {
            "level": 11,
            "expression": "sqrt(36)",
            "expression_latex": "\\sqrt{36}",
            "answers": [6]
        },
        {
            "level": 11,
            "expression": "sqrt(49)",
            "expression_latex": "\\sqrt{49}",
            "answers": [7]
        },
        {
            "level": 11,
            "expression": "sqrt(64)",
            "expression_latex": "\\sqrt{64}",
            "answers": [8]
        },
        {
            "level": 11,
            "expression": "sqrt(81)",
            "expression_latex": "\\sqrt{81}",
            "answers": [9]
        },
        {
            "level": 11,
            "expression": "sqrt(100)",
            "expression_latex": "\\sqrt{100}",
            "answers": [10]
        },
        {
            "level": 11,
            "expression": "sqrt(121)",
            "expression_latex": "\\sqrt{121}",
            "answers": [11]
        },
        {
            "level": 11,
            "expression": "sqrt(144)",
            "expression_latex": "\\sqrt{144}",
            "answers": [12]
        },
        {
            "level": 11,
            "expression": "sqrt(169)",
            "expression_latex": "\\sqrt{169}",
            "answers": [13]
        }
    ],
    [
        {
            "level": 12,
            "expression": "2^3",
            "expression_latex": "2^3",
            "answers": [8]
        },
        {
            "level": 12,
            "expression": "3^2",
            "expression_latex": "3^2",
            "answers": [9]
        },
        {
            "level": 12,
            "expression": "4^3",
            "expression_latex": "4^3",
            "answers": [64]
        },
        {
            "level": 12,
            "expression": "5^2",
            "expression_latex": "5^2",
            "answers": [25]
        },
        {
            "level": 12,
            "expression": "2^5",
            "expression_latex": "2^5",
            "answers": [32]
        },
        {
            "level": 12,
            "expression": "10^3",
            "expression_latex": "10^3",
            "answers": [1000]
        },
        {
            "level": 12,
            "expression": "7^2",
            "expression_latex": "7^2",
            "answers": [49]
        },
        {
            "level": 12,
            "expression": "6^3",
            "expression_latex": "6^3",
            "answers": [216]
        },
        {
            "level": 12,
            "expression": "8^2",
            "expression_latex": "8^2",
            "answers": [64]
        },
        {
            "level": 12,
            "expression": "9^3",
            "expression_latex": "9^3",
            "answers": [729]
        }
    ],
    [
        {
            "level": 13,
            "expression": "5 + 3 * 2",
            "expression_latex": "5 + 3 \\cdot 2",
            "answers": [11]
        },
        {
            "level": 13,
            "expression": "(10 - 4) * 3",
            "expression_latex": "(10 - 4) \\cdot 3",
            "answers": [18]
        },
        {
            "level": 13,
            "expression": "20 / 4 + 5",
            "expression_latex": "20 \\div 4 + 5",
            "answers": [10]
        },
        {
            "level": 13,
            "expression": "15 - 3 * 2",
            "expression_latex": "15 - 3 \\cdot 2",
            "answers": [9]
        },
        {
            "level": 13,
            "expression": "8 * 2 - 10",
            "expression_latex": "8 \\cdot 2 - 10",
            "answers": [6]
        },
        {
            "level": 13,
            "expression": "12 / 3 + 7",
            "expression_latex": "12 \\div 3 + 7",
            "answers": [11]
        },
        {
            "level": 13,
            "expression": "18 - 4 * 3",
            "expression_latex": "18 - 4 \\cdot 3",
            "answers": [6]
        },
        {
            "level": 13,
            "expression": "25 / 5 + 6",
            "expression_latex": "25 \\div 5 + 6",
            "answers": [11]
        },
        {
            "level": 13,
            "expression": "30 - 5 * 4",
            "expression_latex": "30 - 5 \\cdot 4",
            "answers": [10]
        },
        {
            "level": 13,
            "expression": "16 / 4 + 12",
            "expression_latex": "16 \\div 4 + 12",
            "answers": [16]
        }
    ],
    [
        {
            "level": 14,
            "expression": "x + y = 10, x = 4",
            "expression_latex": "x + y = 10, \\ x = 4",
            "answers": [6]
        },
        {
            "level": 14,
            "expression": "2x + y = 15, x = 5",
            "expression_latex": "2x + y = 15, \\ x = 5",
            "answers": [5]
        },
        {
            "level": 14,
            "expression": "x - y = 3, x = 8",
            "expression_latex": "x - y = 3, \\ x = 8",
            "answers": [5]
        },
        {
            "level": 14,
            "expression": "3x + 2y = 20, x = 4",
            "expression_latex": "3x + 2y = 20, \\ x = 4",
            "answers": [4]
        },
        {
            "level": 14,
            "expression": "x + 2y = 12, x = 6",
            "expression_latex": "x + 2y = 12, \\ x = 6",
            "answers": [3]
        },
        {
            "level": 14,
            "expression": "4x - y = 18, x = 5",
            "expression_latex": "4x - y = 18, \\ x = 5",
            "answers": [2]
        },
        {
            "level": 14,
            "expression": "x + 3y = 21, x = 9",
            "expression_latex": "x + 3y = 21, \\ x = 9",
            "answers": [4]
        },
        {
            "level": 14,
            "expression": "5x - 2y = 16, x = 4",
            "expression_latex": "5x - 2y = 16, \\ x = 4",
            "answers": [2]
        },
        {
            "level": 14,
            "expression": "x + y = 25, x = 10",
            "expression_latex": "x + y = 25, \\ x = 10",
            "answers": [15]
        },
        {
            "level": 14,
            "expression": "2x + 3y = 30, x = 6",
            "expression_latex": "2x + 3y = 30, \\ x = 6",
            "answers": [6]
        }
    ],
    [
        {
            "level": 15,
            "expression": "2x + 5 = 15",
            "expression_latex": "2x + 5 = 15",
            "answers": [5]
        },
        {
            "level": 15,
            "expression": "3(x - 4) = 12",
            "expression_latex": "3(x - 4) = 12",
            "answers": [8]
        },
        {
            "level": 15,
            "expression": "x/2 + 3 = 7",
            "expression_latex": "\\frac{x}{2} + 3 = 7",
            "answers": [8]
        },
        {
            "level": 15,
            "expression": "4x - 7 = 21",
            "expression_latex": "4x - 7 = 21",
            "answers": [7]
        },
        {
            "level": 15,
            "expression": "5(x + 2) = 35",
            "expression_latex": "5(x + 2) = 35",
            "answers": [5]
        },
        {
            "level": 15,
            "expression": "2x/3 = 8",
            "expression_latex": "\\frac{2x}{3} = 8",
            "answers": [12]
        },
        {
            "level": 15,
            "expression": "6x - 10 = 20",
            "expression_latex": "6x - 10 = 20",
            "answers": [5]
        },
        {
            "level": 15,
            "expression": "3x + 4 = 19",
            "expression_latex": "3x + 4 = 19",
            "answers": [5]
        },
        {
            "level": 15,
            "expression": "x/5 - 2 = 3",
            "expression_latex": "\\frac{x}{5} - 2 = 3",
            "answers": [25]
        },
        {
            "level": 15,
            "expression": "7x + 3 = 52",
            "expression_latex": "7x + 3 = 52",
            "answers": [7]
        }
    ]
]
const LevelsPage = () => {
    const [currentLevel, setCurrentLevel] = useState(null);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [currentLevel]);

    if (!currentLevel) {
        return (
            <div className="level-selector">
                {levels.map((level, index) => (
                    <React.Fragment key={index}>
                        <LevelRow number={index + 1} isOffset={index % 2 !== 0} setCurrentLevel={setCurrentLevel}/>
                        {/*{index < levelsRows.length - 1 && (*/}
                        {/*    <svg className="vertical-line" width="200" height="130">*/}
                        {/*        <line*/}
                        {/*            x1={index % 2 === 0 ? "30" : "280"}*/}
                        {/*            y1="0"*/}
                        {/*            x2={index % 2 === 0 ? "240" : "70"}*/}
                        {/*            y2="130"*/}
                        {/*            stroke="rgba(255, 255, 255, 0.4)"*/}
                        {/*            strokeWidth="3"*/}
                        {/*        />*/}
                        {/*    </svg>*/}
                        {/*)}*/}
                    </React.Fragment>
                ))}
            </div>
        )
    } else {
        return (
            <PlayLevel level={shuffleArray(levels[currentLevel - 1])} setCurrentLevel={setCurrentLevel}
                       currentLevel={currentLevel}/>
        )
    }

}
export default LevelsPage;