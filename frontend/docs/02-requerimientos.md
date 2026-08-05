# REQUERIMIENTOS

## Introducción

Este documento define los requerimientos funcionales y no funcionales del producto. Su objetivo es establecer el comportamiento esperado del sistema durante su desarrollo, sirviendo como guía para el diseño, implementación y futuras mejoras.

---

# Requerimientos funcionales

Los siguientes requerimientos describen las funcionalidades que deberá ofrecer el sistema para los distintos tipos de usuarios.

## Cliente

**RF-001**  
El sistema deberá permitir visualizar el catálogo de servicios disponibles.

**RF-002**  
El sistema deberá permitir consultar la información de cada servicio (duración, precio y descripción).

**RF-003**  
El sistema deberá permitir seleccionar un servicio.

**RF-004**  
El sistema deberá permitir seleccionar un barbero.

**RF-005**  
El sistema deberá permitir visualizar únicamente los horarios disponibles del barbero seleccionado.

**RF-006**  
El sistema deberá permitir registrarse como cliente.

**RF-007**  
El sistema deberá permitir iniciar sesión.

**RF-008**  
El sistema deberá mostrar un resumen de la reserva antes de su confirmación.

**RF-009**  
El sistema deberá permitir confirmar una reserva.

**RF-010**  
El sistema deberá permitir visualizar el historial de turnos realizados.

**RF-011**  
El sistema deberá permitir cancelar un turno respetando las reglas establecidas por la barbería.

**RF-012**  
El sistema deberá impedir reservar horarios que ya se encuentren ocupados.

**RF-013**  
El sistema deberá mostrar un mensaje de confirmación una vez realizada la reserva.

---

## Administrador

**RF-014**  
El sistema deberá permitir iniciar sesión como administrador.

**RF-015**  
El sistema deberá permitir crear, modificar, eliminar y consultar servicios.

**RF-016**  
El sistema deberá permitir crear, modificar, eliminar y consultar barberos.

**RF-017**  
El sistema deberá permitir visualizar, modificar y cancelar turnos.

**RF-018**  
El sistema deberá permitir consultar la información de los clientes registrados.

**RF-019**  
El sistema deberá permitir visualizar un dashboard con información resumida del negocio.

**RF-020**  
El sistema deberá permitir configurar los horarios laborales de cada barbero.

**RF-021**  
El sistema deberá permitir bloquear horarios específicos por vacaciones, feriados o motivos particulares.

**RF-022**  
El sistema deberá permitir visualizar estadísticas básicas del negocio.

---

# Requerimientos no funcionales

Los siguientes requerimientos definen las características de calidad que deberá cumplir el producto.

**RNF-001**  
La aplicación deberá ser completamente responsive para dispositivos móviles, tablets y computadoras.

**RNF-002**  
La interfaz deberá ser intuitiva, moderna y fácil de utilizar.

**RNF-003**  
El tiempo de carga inicial no deberá superar los 3 segundos en condiciones normales de conexión.

**RNF-004**  
La aplicación deberá poder instalarse como una Progressive Web Application (PWA).

**RNF-005**  
La aplicación deberá ser compatible con los principales navegadores modernos.

**RNF-006**  
El desarrollo deberá seguir una arquitectura basada en componentes reutilizables.

**RNF-007**  
La interfaz deberá mantener una identidad visual consistente en todas las pantallas.

**RNF-008**  
El sistema deberá diseñarse pensando en su escalabilidad para futuras funcionalidades.

---

# Restricciones

Durante el desarrollo del producto deberán respetarse las siguientes restricciones tecnológicas:

- Frontend desarrollado con React.
- Backend desarrollado con Node.js.
- Base de datos PostgreSQL.
- Control de versiones mediante Git.
- Arquitectura cliente-servidor.

---

# Supuestos

Se asumen las siguientes condiciones para el correcto funcionamiento del sistema:

- El cliente dispondrá de conexión a Internet.
- Cada barbero tendrá un horario laboral configurado.
- Los horarios serán administrados por un usuario administrador.
- El administrador mantendrá actualizada la información de servicios, horarios y barberos.
- Cada cliente dispondrá de un número de teléfono o correo electrónico válido para registrarse.