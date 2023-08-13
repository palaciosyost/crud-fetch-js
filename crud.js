const d = document;


let $form = d.getElementById('form'),
    $titulo = d.getElementById('titulo-form'),
    $tabla = d.getElementById('crud-table'),
    $fragmento = d.createDocumentFragment(),
    $template = d.querySelector('.template-table').content,
    $body = d.getElementById('info-table');
const getData = async () => {
    try {
        let res = await fetch('http://localhost:3000/pokemon'),
            json = await res.json();
        if (!res.ok) throw { status: res.status, text: res.statusText }
        console.log(res);
        json.forEach(element => {
            $template.getElementById('nombre').textContent = element.nombre
            $template.getElementById('tipo').textContent = element.tipo
            $template.querySelector('.eliminar').dataset.id = element.id
            $template.querySelector('.editar').dataset.id = element.id
            $template.querySelector('.editar').dataset.nombre = element.nombre
            $template.querySelector('.editar').dataset.tipo = element.tipo
            let clone = d.importNode($template, true);
            $fragmento.appendChild(clone);
        });
        $body.appendChild($fragmento)
    } catch (error) {
        console.log(error);
        let text = `<br><br><p class="text-danger">Error ${error.status} ${error.text}</p>`
        $body.insertAdjacentHTML('afterbegin', text);
    }
}
d.addEventListener('submit', async e => {
    if (e.target === $form) {
        e.preventDefault()
        if (!e.target.id.value) {
            let data = new FormData($form);
            try {
                let opciones = {
                    url: 'http://localhost:3000/pokemon',
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=utf-8" },
                    body: JSON.stringify({
                        nombre: data.get('nombre'),
                        tipo: data.get('tipo')
                    })
                }
                res = await fetch('http://localhost:3000/pokemon', opciones),
                    json = await res.json();
                if (!res.ok) throw { status: res.status, text: res.statusText }
            } catch (error) {
                console.log(error);
                let text = `<br><br><p class="text-danger">Error ${error.status} ${error.text}</p>`
                $body.insertAdjacentHTML('afterbegin', text);
            }
        }
        else {
            let data = new FormData($form);
            try {
                let opciones = {
                    url: 'http://localhost:3000/pokemon',
                    method: "PUT",
                    headers: { "Content-type": "application/json;charset=utf-8" },
                    body: JSON.stringify({
                        nombre: data.get('nombre'),
                        tipo: data.get('tipo')
                    })
                }
                res = await fetch(`http://localhost:3000/pokemon/${data.get('id')}`, opciones)
                if (!res.ok) throw { status: res.status, text: res.statusText }
            } catch (error) {
                console.log(error);
                let text = `<br><br><p class="text-danger">Error ${error.status} ${error.text}</p>`
                $body.insertAdjacentHTML('afterbegin', text);
            }
        }
    }
})
d.addEventListener('click', async e => {
    let btnEditar = d.querySelector('.editar')
    if (e.target.matches('.editar')) {
        $titulo.textContent = "Editar el Registro"
        $form.nombre.value = e.target.dataset.nombre
        $form.tipo.value = e.target.dataset.tipo
        $form.id.value = e.target.dataset.id
    }
    if (e.target.matches('.eliminar')) {
        try {
            let opciones = {
                method: "DELETE",
                headers: { "Content-type": "application/json;charset=utf-8" },
            }
            res = await fetch(`http://localhost:3000/pokemon/${e.target.dataset.id}`, opciones)
            if (!res.ok) throw { status: res.status, text: res.statusText }
        } catch (error) {
            console.log(error);
            let text = `<br><br><p class="text-danger">Error ${error.status} ${error.text}</p>`
            $body.insertAdjacentHTML('afterbegin', text);
        }

    }
}
)
d.addEventListener('DOMContentLoaded', getData)


