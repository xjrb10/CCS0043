// CCS0043L source code Template for 3T AY 2022-2023
/*
    Progam:     Computation of Grades using Function
    Programmer: BONCALES, Joen Ralph S.
    Section:    BSCS-AN22
    Start Date: June 2, 2023
    End Date:   June 2, 2023
*/

(async () => {
    const amountAndWeights = {
        "Class Participation": {
            amount: 5,
            weight: 0.3,
            inputName: "enabling assessment",
            outputIndex: 1
        },
        "Summative Assessment": {
            amount: 3,
            weight: 0.3,
            outputIndex: 2
        },
        "Final Exam": {
            amount: 1,
            weight: 0.4,
            outputIndex: 3
        },
    };

    function getGradeLetter(grade) {
        if (grade < 60) return "F";
        if (grade <= 69) return "D";
        if (grade <= 79) return "C";
        if (grade <= 89) return "B";
        if (grade <= 100) return "A";
        return "OVERFLOW";
    }

    const isNode = typeof window === 'undefined';

    async function prompt(msg) {
        async function promptAsync(question) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            return new Promise((resolve) => {
                rl.question(question, (answer) => {
                    rl.close();
                    resolve(answer);
                });
            });
        };
        return isNode ? await (promptAsync)(msg) : prompt(msg);
    }

    // main operations
    let content = [];
    for (let studentId = 0; studentId < 5; studentId++) {
        const nameMsg = `Enter the name of the student ${studentId + 1}: `;
        const name = await prompt(nameMsg);
        content[studentId] = [name, 0, 0, 0, 0, 0];
        let weightedAverage = 0;
        for (const key of Object.keys(amountAndWeights)) {
            const metric = amountAndWeights[key];
            const metricName = metric["inputName"] || key;
            let avg = 0;
            for (let i = 1; i <= metric.amount; i++) {
                const value = parseFloat(await prompt(`Enter ${metricName.toLowerCase()} ${metric.amount > 1 ? i : ''}`.trim() + ": "));
                avg += value;
            }
            avg /= metric.amount;
            weightedAverage += avg * metric.weight;
            content[studentId][metric["outputIndex"]] = Math.round(avg);
        }
        content[studentId][4] = Math.round(weightedAverage);
        content[studentId][5] = getGradeLetter(Math.round(weightedAverage));
    }

    // display content
    const columns = ["Name of Student", "Class Participation", "Summative Assessment", "Exam Grade", "Grade Score", "Letter Grade"];
    if (isNode) {
        // node.js
        console.log(columns.join(" | "));
        for (const row of content) {
            console.log(`${row[0]}\t\t${row[1]}\t\t\t${row[2]}\t\t${row[3]}\t\t${row[4]}\t\t${row[5]}`);
        }
    } else {
        const table = document.createElement("table");
        table.border = '1';
        const thead = document.createElement("thead");
        for (const col of columns) {
            const th = document.createElement("th");
            th.innerText = col;
            thead.appendChild(th);
        }
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        for (const row of content) {
            const tr = document.createElement("tr");

            for (const col of row) {
                const td = document.createElement("td");
                td.innerText = col;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        document.body.appendChild(table);
    }
})();
