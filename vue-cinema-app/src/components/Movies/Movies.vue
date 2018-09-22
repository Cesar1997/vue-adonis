<template>
    <div class="Movies__Wrapper">
        <div class="col-md-3 col-xs-12 " id="filters">
            <movie-filter></movie-filter>
        </div>
        <div class="col-md-9 col-xs-12" id="movies">
            <div v-if="movies && movies.length > 0">
                <div v-for="(movie,index) in movies"  class="movie">
                    <movie 
                        :movie="movie" 
                        :booking="true" 
                        v-on:startReservation="reservation($event)"
                        :key="index"
                        >
                        
                    </movie>
                </div>
            </div>
            <div v-else>
                <div class="alert alert-danger">{{$t('movie.empty')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import moviesType from '@/types/movie'
    import Movie from "./MovieItem"
    import MovieFilter from './MovieFilter'
    export default {
        components : {
            Movie,
            MovieFilter
        },
        name : 'movie-list',
        mounted () {
            const cinemaId = this.$route.params.id;
            this.fetchMovies(cinemaId);
        },
        methods : {
            ...mapActions({
                fetchMovies : moviesType.actions.fetchMovies
            }),
            reservation (movieId) {
                $this.$rotuer.push({name: 'booking', params : {movieId : movieId}});
            }
        },
        computed : {
            ...mapGetters({
                movies : moviesType.getters.movies
            })
        }
    }
</script>
<style scoped>
    .Movies__Wrapper {
    
    }
</style>