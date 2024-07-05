function criaProjeto() {
    const lProj = document.getElementById('listaProjetos');
    const source = document.getElementById("projeto-template").innerHTML;
    lProj.innerHTML += source;
}

var cont = 0;
function criaPasso() {
    let source = document.getElementById('passo-template').innerHTML;
    let lPassos = document.getElementById('listaPassos');

    source = source.replaceAll('idReplace', `flush-collapse${cont}`)
    lPassos.innerHTML += source;
    cont++;
}

function statusInpt(oEvent) {
    let listaProjetos = document.getElementById('listaProjetos');
    let inputs = listaProjetos.querySelectorAll('input');
    let selects = listaProjetos.querySelectorAll('select');
    let btns = listaProjetos.querySelectorAll('button');

    inputs.forEach(input => {
        if (!oEvent.target.checked) {
            input.removeAttribute('disabled');
        } else {
            input.setAttribute('disabled', 'true');
        }
    });
    selects.forEach(select => {
        if (!oEvent.target.checked) {
            select.removeAttribute('disabled');
        } else {
            select.setAttribute('disabled', 'true');
        }
    });
    btns.forEach(btn => {
        if (!oEvent.target.checked) {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', 'true');
        }
    });


}


