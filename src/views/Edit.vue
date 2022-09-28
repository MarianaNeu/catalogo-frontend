<template>
    <div>
    <div class="box ">
    <div class="field">
    <label class="label">Descripcion</label>
    <div class="control">
        <input class="input" type="text" v-model="producto.descrip" placeholder="Descripcion del producto" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Estado</label>
    <div class="control">
        <input class="input" type="text" v-model="producto.status" placeholder="Estado del producto" required>
    </div>
    </div>

    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" id="submitButton" @click.prevent="edit">Editar</button>
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

export default {
    name:"EditProducto",
    data() {
        return{
            producto:{
                nombre: null,
                descrip: null,
                precio: null,
                status: null,
            }
        };
    },
    created() {
        this.producto = this.$route.query.inst;
    },
    methods:{
        cancelar(){
            this.$router.push({name: "Producto"});
        },
        edit(){
            axios.put(`http://localhost:5000/api/productos/${this.producto.id}`, this.producto)
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