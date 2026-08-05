# Usuario
    -IdUsuario
    -PasswordHash
    -Email
    -FechaRegistro
    -Estado

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
