<template>
  <div class="container my-4">
    <h2 class="mb-4">Recipe News</h2>
    <div class="mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search by date, title, content, or category"
      />
    </div>
    <div class="row">
      <div v-for="item in paginatedNews" :key="item.id" class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text"><strong>Date:</strong> {{ item.date }}</p>
            <p class="card-text">{{ item.content }}</p>
            <p class="card-text"><strong>Category:</strong> {{ item.category }}</p>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">Previous</button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import newsData from '../data/news.json';

export default {
  name: 'News',
  data() {
    return {
      news: newsData,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    filteredNews() {
      const query = this.searchQuery.toLowerCase();
      return this.news.filter(
        (item) =>
          item.title.toLowerCase().includes(query) 
      );
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    },
  },
};
</script>

