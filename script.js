let chart;

function calculateProfit(){
    const a = +document.getElementById("a").value;
    const b = +document.getElementById("b").value;
    const c = +document.getElementById("c").value;
    const d = +document.getElementById("d").value;
    const qmax = +document.getElementById("qmax").value;

    // Оптимальный объём продаж
    const q_opt = (a - c)/(2*b);
    const p_opt = a - b*q_opt;
    const profit_max = p_opt*q_opt - (c*q_opt + d);

    // Показать результат
    document.getElementById("result").innerHTML = `
        <b>Оптимальный объём продаж:</b> ${q_opt.toFixed(1)} шт.<br>
        <b>Оптимальная цена:</b> ${p_opt.toFixed(2)} сом<br>
        <b>Максимальная прибыль:</b> ${profit_max.toFixed(2)} сом
    `;

    drawChart(a,b,c,d,qmax,q_opt,profit_max);
    drawStore();
}

function drawChart(a,b,c,d,qmax,q_opt,profit_max){
    let q=[], profit=[];
    for(let i=0;i<=qmax;i++){
        let P = a - b*i;
        let C = c*i + d;
        q.push(i);
        profit.push(P*i - C);
    }

    if(chart) chart.destroy();

    const ctx=document.getElementById("chart");
    chart=new Chart(ctx,{
        type:'line',
        data:{
            labels:q,
            datasets:[{
                label:"Прибыль π(q)",
                data:profit,
                borderColor:"#ff5a5a",
                borderWidth:3,
                fill:false
            },{
                label:"Максимум прибыли",
                data:[{x:q_opt,y:profit_max}],
                type:'scatter',
                pointRadius:8,
                pointBackgroundColor:'red'
            }]
        }
    });
}

function drawStore(){
    const canvas=document.getElementById("storeDrawing");
    const ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Пол магазина
    ctx.fillStyle="#ffe5e5";
    ctx.fillRect(50,50,500,300);

    // Стены
    ctx.strokeStyle="#000";
    ctx.lineWidth=3;
    ctx.strokeRect(50,50,500,300);

    // Касса
    ctx.fillStyle="#ffcccc";
    ctx.fillRect(420,60,100,50);
    ctx.strokeRect(420,60,100,50);
    ctx.fillStyle="#000";
    ctx.fillText("Касса",470,90);

    // Витрины
    ctx.fillStyle="#ffd1d1";
    ctx.fillRect(70,70,100,100);
    ctx.fillRect(200,70,100,100);
    ctx.fillStyle="#000";
    ctx.fillText("Блузки",95,120);
    ctx.fillText("Платья",225,120);

    // Полки
    ctx.fillStyle="#ffc1c1";
    ctx.fillRect(350,150,120,40);
    ctx.fillRect(350,220,120,40);
    ctx.fillStyle="#000";
    ctx.fillText("Юбки",390,175);
    ctx.fillText("Штаны",390,245);

    // Вход
    ctx.fillStyle="#777";
    ctx.fillRect(270,340,60,10);
    ctx.fillStyle="#000";
    ctx.fillText("Вход",295,355);
}