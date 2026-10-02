# Usuario

- IdUsuario
- PasswordHash
- Email
- FechaRegistro
- Estado

# Empresa

- IdEmpresa
- Nombre
- Email
- Telefono
- Direccion
- Slug
- Estado
- FechaAlta
  Slug es el identificador público de la empresa para URLs como:
  trimly.com/barberia-48

# EmpresaImagen

Esta sería la nueva tabla para las imágenes del negocio.

- IdEmpresaImagen
- IdEmpresa
- Url
- Orden
- Estado
- FechaAlta

# Employee

    -IdEmployee
    -UsuarioId
    -Nombre
    -Apellido
    -Dni
    -Foto
    -Descripcion
    -Experiencia
    -Rol
    -Estado
    -FechaAlta

# Cliente

    -IdCliente
    -UsuarioId
    -DNI
    -Nombre
    -Apellido
    -Telefono
    -Foto
    -Estado
    -FechaAlta

# Disponibilidad

    -IdDisponibilidad
    -IdEmployee
    -DiaSemana
    -HoraInicio
    -HoraFin
    -Estado

# Servicio

    -IdServicio
    -Nombre
    -Descripcion
    -Duracion
    -Costo
    -Estado

# Reserva

    -IdReserva
    -IdUsuario (Cliente)
    -IdEmployee
    -IdServicio
    -Fecha
    -Hora
    -Estado
