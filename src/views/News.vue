<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">Recipe News</h2>

    <!-- Search Inputs -->
    <div class="row g-2 mb-3">
      <div class="col-12 col-sm-6 col-md-4">
        <input
          v-model="titleQuery"
          type="text"
          class="form-control"
          placeholder="Search by title"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <input
          v-model="dateQuery"
          type="text"
          class="form-control"
          placeholder="Search by date (e.g. 2024-10-01)"
        />
      </div>
      <div class="col-12 col-md-4">
        <input
          v-model="contentQuery"
          type="text"
          class="form-control"
          placeholder="Search by content"
        />
      </div>
    </div>

    <!-- Category Radio Buttons -->
    <div class="mb-3">
      <label class="form-label">Category</label>
      <div class="d-flex flex-wrap gap-3">
        <div class="form-check">
          <input type="radio" id="All" class="form-check-input" v-model="categoryFilter" value="" />
          <label class="form-check-label" for="All">All</label>
        </div>
        <div class="form-check">
          <input type="radio" id="Cooking Tips" class="form-check-input" v-model="categoryFilter" value="Cooking Tips" />
          <label class="form-check-label" for="Cooking Tips">Cooking Tips</label>
        </div>
        <div class="form-check">
          <input type="radio" id="Recipes" class="form-check-input" v-model="categoryFilter" value="Recipes" />
          <label class="form-check-label" for="Recipes">Recipes</label>
        </div>
      </div>
    </div>

    <!-- News Cards -->
    <div class="row">
      <div v-for="item in paginatedNews" :key="item.id" class="col-12 col-sm-6 col-lg-4 mb-3">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text"><strong>Date:</strong> {{ item.date }}</p>
            <p class="card-text">{{ item.content }}</p>
            <p class="card-text mt-auto"><strong>Category:</strong> {{ item.category }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">Previous</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
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
      itemsPerPage: 6,
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
      return Math.ceil(this.filteredNews.length / this.itemsPerPage); //rounds up 
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end); // does not include the end
    },
  },
};
</script>

