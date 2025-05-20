<template>
  <div class="container my-4">
    <h2 class="mb-4">Recipe News</h2>
    <div class="mb-3">
      <input
        v-model="titleQuery"
        type="text"
        class="form-control"
        placeholder="Search by title"
      />
<!-- Date Search -->
  <input
    v-model="dateQuery"
    type="text"
    class="form-control mb-2"
    placeholder="Search by date (e.g. 2024-10-01)"
  />

  <!-- Content Search -->
  <input
    v-model="contentQuery"
    type="text"
    class="form-control mb-2"
    placeholder="Search by content"
  />



      <label for="">Category</label><br>
      <input type="radio" id="All" v-model="categoryFilter" value="" />
<label for="All"> All</label><br>
      <input type="radio" id="Cooking Tips" v-model="categoryFilter" value="Cooking Tips"/>
      <label for="Cooking Tips"> Cooking Tips</label><br>
      <input type="radio" id="Recipes" v-model="categoryFilter" value="Recipes"/>
      <label for="Recipes"> Recipes</label>

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
      titleQuery: '',
      dateQuery: '',
    contentQuery: '',
      categoryFilter: '',
      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    filteredNews() {
      const title = this.titleQuery.toLowerCase();
    const date = this.dateQuery.toLowerCase();
    const content = this.contentQuery.toLowerCase();
    const category = this.categoryFilter.toLowerCase();

    return this.news.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(title);
      const matchesDate = item.date.toLowerCase().includes(date);
      const matchesContent = item.content.toLowerCase().includes(content);
      const matchesCategory = !category || item.category.toLowerCase() === category;

      return matchesTitle && matchesDate && matchesContent && matchesCategory;
    });
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

