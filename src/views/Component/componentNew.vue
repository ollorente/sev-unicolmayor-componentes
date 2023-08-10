<script setup lang="ts">
import CustomLayout from "./../../layouts/custom.vue"
import UIHead from "./../../components/Client/Head.vue"
</script>

<template>
  <CustomLayout>
    <UIHead back :backUrl="{ name: 'Components' }">
      Agregar componente
    </UIHead>

    <div class="card border-0 shadow my-3">
      <div class="card-body">
        <form>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" placeholder="Título *" autofocus required>
            <label for="title">Título *</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="teacher" placeholder="Docente *" required>
            <label for="teacher">Docente *</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="unit" placeholder="Unidad *" required>
            <label for="unit">Unidad *</label>
          </div>

          <div class="form-floating mb-3">
            <select class="form-select" id="facultyId" aria-label="Facultad">
              <option selected>--- Seleccione ---</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="facultyId">Facultad</label>
          </div>

          <div class="form-floating mb-3">
            <select class="form-select" id="programId" aria-label="Programa">
              <option selected>--- Seleccione ---</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="programId">Programa</label>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fw-bold">Índice</label>
            <textarea class="form-control" id="content" rows="10" placeholder="Índice"></textarea>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fw-bold">Introducción</label>
            <textarea class="form-control" id="content" rows="10" placeholder="Introducción"></textarea>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fw-bold">Contenido</label>
            <textarea class="form-control" id="content" rows="20" placeholder="Contenido"></textarea>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fw-bold">Bibliografía</label>
            <textarea class="form-control" id="content" rows="10" placeholder="Bibliografía"></textarea>
          </div>

          <button type="submit" class="btn btn-primary rounded-pill py-1 px-5">Crear</button>
        </form>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>