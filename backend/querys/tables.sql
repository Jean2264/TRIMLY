-- ==========================================
-- TABLA USUARIO
-- ==========================================

CREATE TABLE Usuario
(
    IdUsuario SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Estado BOOLEAN NOT NULL DEFAULT TRUE,
    FechaAlta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABLA ROL
-- ==========================================

CREATE TABLE Rol
(
    IdRol SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Datos iniciales

INSERT INTO Rol (Nombre)
VALUES
('Administrador'),
('Barbero'),
('Recepcionista');

-- ==========================================
-- TABLA EMPLEADO
-- ==========================================

CREATE TABLE Empleado
(
    IdEmpleado SERIAL PRIMARY KEY,

    UsuarioId INTEGER UNIQUE,

    IdRol INTEGER NOT NULL,

    DNI VARCHAR(8) NOT NULL UNIQUE,

    Nombre VARCHAR(100) NOT NULL,

    Apellido VARCHAR(100) NOT NULL,

    Telefono VARCHAR(30),

    Experiencia TEXT,

    Foto VARCHAR(255),

    Estado BOOLEAN NOT NULL DEFAULT TRUE,

    FechaAlta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Empleado_Usuario
        FOREIGN KEY (UsuarioId)
        REFERENCES Usuario(IdUsuario),

    CONSTRAINT FK_Empleado_Rol
        FOREIGN KEY (IdRol)
        REFERENCES Rol(IdRol)
);

-- ==========================================
-- TABLA CLIENTE
-- ==========================================

CREATE TABLE Cliente
(
    IdCliente SERIAL PRIMARY KEY,

    UsuarioId INTEGER UNIQUE,

    DNI VARCHAR(8) NOT NULL UNIQUE,

    Nombre VARCHAR(100) NOT NULL,

    Apellido VARCHAR(100) NOT NULL,

    Telefono VARCHAR(30),

    Foto VARCHAR(255),

    Estado BOOLEAN NOT NULL DEFAULT TRUE,

    FechaAlta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Cliente_Usuario
        FOREIGN KEY (UsuarioId)
        REFERENCES Usuario(IdUsuario)
);




INSERT INTO Usuario
(
    Email,
    PasswordHash
)
VALUES
(
    'jean@gmail.com',
    '123456'
);

INSERT INTO Cliente
(
    UsuarioId,
    DNI,
    Nombre,
    Apellido,
    Telefono
)
VALUES
(
    1,
    '12345678',
    'Jean',
    'Paiva',
    '1122334455'
);

select * from Usuario
update Usuario set Estado= true WHERE IdUsuario=1
select * from Cliente