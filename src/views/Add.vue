<template>
    <div>
    <div class="box ">
    <div class="field">
    <label class="label">Descripcion</label>
    <div class="control">
        <input class="input" type="text" v-model="newProducto.descrip" placeholder="Descripcion del producto" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Estado</label>
    <div class="control">
        <input class="input" type="text" v-model="newProducto.status" placeholder="Estado del producto" required>
    </div>
    </div> 

    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" id="submitButton" @click.prevent="add">Guardar</button>
    </div>
    <div class="control">
        <button class="button is-text" @click.prevent="cancelar">Cancelar</button>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: "AddProducto",
    data(){
        return {
            newProducto: {
                name: null,
                descrip: null,
                precio: null,
                status: null,
                proveedor_id: null,
                categoria_id: null,
            }
        };
    },
    mounted(){
        this.newProducto={
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name: "Producto"});
        },
        add(){
            axios.post(`http://localhost:5000/api/productos`, this.newProducto)
              .then(()=> {
                this.$router.push({name: "Producto"});
              })
              .catch((error) => {
                console.log(error);
              })
        }
    }
            

}
</script>

<style scoped>

</style>