<template>
  <div>
    <!--Cabecera-->
    <section class="hero is-small is-link">
      <div class="hero-body">
        <p class="title">
          Catálogo
        </p>
        <p class="subtitle">
          Aquí se muestra la lista de productos disponibles actualmente
        </p>
      </div>
    </section>

    <!--Búscador y filtros-->
    <div class="search-area">
      <nav class="level">
        <!-- Left side -->
        <form class="level-left" @submit.prevent="searchProducts">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="búsqueda de productos..." style="min-width: calc(45vw)" v-model='buscador'>
              </p>
              <p class="control">
                <button class="button is-link">
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </form>
        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>Filtrar por</strong> Categoría
            </p>
          </div>
          <div class="select is-link">
            <select>
              <option v-for="(categoria, index) in categoriaList" :key="index">{{ categoria.descrip }}</option>
            </select>
          </div>
        </div>
      </nav>
    </div>

    <!--Listado de productos-->
    <div class="list-catalogo">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="product in productList" :key="product.id">
          <div class="container">

            <div class="card">

              <header class="card-header">
                <p class="card-header-title">
                  {{ product.nombre }}
                </p>
                <button class="card-header-icon" aria-label="more options" data-tooltip="Mostrar detalle">
                  <span class="icon">
                    <font-awesome-icon icon="eye" aria-hidden="true"/>
                  </span>
                </button>
              </header>

              <div class="card-content">
                <div class="content">
                  <img src="../assets/images/generic-product.png" width="150" class="image-product"
                       :alt="product.nombre"/>
                  <p v-if="product.descrip"><strong>Descripción: </strong> {{ product.descrip }} </p>
                  <p v-if="product.precio"><strong>Precio: </strong> {{ product.precio }} </p>
                  <p v-if="product.estado"><strong>Estado: </strong> {{ product.estado }} </p>
                  <p v-if="product._categoria.descrip"><strong>Categoria: </strong> 

                    {{ product._categoria.descrip }} </p>

                </div>
              </div>

              <footer class="card-footer">
                <a href="#" class="card-footer-item">
                  <span class="icon"><font-awesome-icon icon="credit-card"/></span> Comprar
                </a>
                <a href="#" class="card-footer-item">
                  <span class="icon"><font-awesome-icon icon="heart"/></span> Favorito
                </a>
              </footer>

            </div>

          </div>
        </div>
      </div>
    </div>

    <!--Paginador-->
    <div class="pagination-area">
      <PaginationComponent :page="pagination.page" :pages="pagination.pages" @selected="(page) => searchProducts(page)"></PaginationComponent>
    </div>
    <div class="pageloader is-bottom-to-top is-link" style="opacity: 0.8" :class="{'is-active': loading}"><span class="title">Cargando productos...</span></div>

  </div>
</template>

<script>
import {HTTP} from '@/http'
import PaginationComponent from "../components/PaginationComponent";

export default {
  name: "Catalogo",
  components: { PaginationComponent },
  data() {
    return {
      loading: false,
      search: {
      },
      buscador: null,
      pagination: {
        page: 1,
        pages: 1
      },
      productList: [],
      categoriaList: []
    }
  },
  mounted() {
    this.searchProducts(); //al abrir la pagina busca los productos
    this.getCategorias();
  },
  methods: {
    async searchProducts(page) {
      this.loading = true;
      this.search.nombre = this.buscador
      console.log(this.search.nombre)
      try {
        let data = (await HTTP.post(`/search/productos`,this.search, {
          params: {
            page: page ? page : 1
          }
        })).data;
        if (data.items) {
          this.productList = data.items;
          this.pagination.page = data.page;
          this.pagination.pages = data.pages;
        } else {
          this.productList = data;
          this.pagination = {};
        }
      } catch (error) {
        //eslint-disable-next-line no-prototype-builtins
        if (!error.hasOwnProperty('response')) {
          this.notificar('error', this.title, 'Ha ocurrido un error inesperado. Error: ' + error);
        }
        if (error.response.status !== 404) {
          this.notificar('error', this.title, 'No se han podido obtener la lista de proyectos. Error: ' + error);
        }
        this.productList = [];
      } finally {
        this.loading = false;
      }
    },
    async getCategorias() { //significa que hace la llamada a un servicio y tiene que esperar a que ese servicio me responda
      try {
        let data = (await HTTP.get(`/categorias`)).data;
        if (data.items) {
          this.categoriaList = data.items;
        } else {
          this.categoriaList = data;
        }
        // Se agrega al principio la opción 'Todos'
        this.categoriaList = [{descrip: 'Todos'}, ...this.categoriaList];
      } catch (error) {
        this.categoriaList = [];
      }
    }
  }
}
</script>

<style scoped>
.list-catalogo {
  margin: 50px;
}

.image-product {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 50%;
}

.search-area {
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
}

.pagination-area{
  margin: 3%;
}
</style>
