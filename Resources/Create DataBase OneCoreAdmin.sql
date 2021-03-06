USE [master]
GO

IF NOT EXISTS (SELECT * FROM master..sysdatabases WHERE name = 'OneCoreAdmin')
	CREATE DATABASE [OneCoreAdmin]
GO

USE [OneCoreAdmin]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF_Usuarios_fechaCreacion]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Usuarios] DROP CONSTRAINT [DF_Usuarios_fechaCreacion]
END
GO
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND name = N'IX_Usuarios')
DROP INDEX [IX_Usuarios] ON [dbo].[Usuarios]
GO
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND name = N'IX_Usuarios_Usuario')
ALTER TABLE [dbo].[Usuarios] DROP CONSTRAINT [IX_Usuarios_Usuario]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND type in (N'U'))
DROP TABLE [dbo].[Usuarios]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Usuarios](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[contrasena] [varchar](50) NOT NULL,
	[estatus] [bit] NOT NULL,
	[sexo] [bit] NOT NULL,
	[correo] [varchar](100) NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 
GO
INSERT [dbo].[Usuarios] ([idUsuario], [usuario], [contrasena], [estatus], [sexo], [correo], [fechaCreacion]) VALUES (1, N'admincore', N'224151242102132179113202248101022284211123', 1, 1, N'admin@onecoreadmin.mx', GETDATE())
GO
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND name = N'IX_Usuarios_Usuario')
ALTER TABLE [dbo].[Usuarios] ADD  CONSTRAINT [IX_Usuarios_Usuario] UNIQUE NONCLUSTERED 
(
	[usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Usuarios]') AND name = N'IX_Usuarios')
CREATE NONCLUSTERED INDEX [IX_Usuarios] ON [dbo].[Usuarios]
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF_Usuarios_fechaCreacion]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Usuarios] ADD  CONSTRAINT [DF_Usuarios_fechaCreacion]  DEFAULT (getdate()) FOR [fechaCreacion]
END
GO