export default class FotoService {

    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    cadastra(foto) {
        return this._resource.save(foto);
    }

    lista() {
        return  this._resource.query().then( 
            res => res.json(),
            error => {
                console.log(error);
                throw new Error('Não foi possível obter as fotos. Tenta mais tarde');
            }
        );
    }

    apaga(id) {
        return this._resource.delete({ id });
    }

    busca(id) {
        return this._resource.get( {id} ).then( res => res.json() );
    }
} 