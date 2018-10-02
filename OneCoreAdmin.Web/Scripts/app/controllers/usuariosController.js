(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .controller('usuariosController', usuariosController);

    usuariosController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q', 'vcRecaptchaService', 'blockUI'];

    function usuariosController($scope, securityFactory, $log, $window, $sessionStorage, $q, vcRecaptchaService, blockUI) {

        if ($sessionStorage.authorizationData == null) {
            $window.location.href = '/login';
        }
        else {
            var full = $q.defer();
            loadPage();
        }

        function loadPage() {

            $scope.listaUsuarios = {};
            $scope.proceso = '';
            $scope.pedirContrasena = true;
            $scope.usuario = {
                usuario: '',
                contrasena: '',
                confirmarcontrasena: '',
                correo: '',
                estatus: true,
                sexo: true
            };

            blockUI.start('Cargando...');

            securityFactory.obtenerUsuarios()
                .then(function (data) {

                    $scope.dataUsuarios = data;

                    if ($scope.dataUsuarios.data.listaUsuarios.length > 0) {

                        $scope.myTable =
                            $('#dynamic-table')
                                .DataTable({
                                    bAutoWidth: false,
                                    destroy: true,
                                    responsive: true,
                                    data: $scope.dataUsuarios.data.listaUsuarios,
                                    columns: [

                                        { data: "idUsuario" },
                                        { data: "usuario" },
                                        { data: "sexoDescripcion" },
                                        { data: "correo" },
                                        { data: "estatusDescripcion" },
                                        { data: "fechaCreacion" },

                                        {
                                            defaultContent: '<div class="hidden-sm hidden-xs action-buttons"><a class="green" href="#" id="btnEditarBanco"><i class="ace-icon fa fa-pencil bigger-130"></i> </a> <a class="red" href="#" id="id-btn-dialog2"><i class="ace-icon fa fa-trash-o bigger-130"></i> </a> </div>' +
                                                '<div class="hidden-md hidden-lg"><div class="inline pos-rel"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto"><i class="ace-icon fa fa-caret-down icon-only bigger-120"></i> </button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close"> <li> <a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"> <span class="green"><i class="ace-icon fa fa-pencil-square-o bigger-120"></i></span></a></li><li><a href="#" id="id-btn-dialog2"> <span class="red"><i class="ace-icon fa fa-trash-o bigger-120"></i></span></a> </li> </ul></div></div>', bSortable: 'false'
                                        }

                                    ],

                                    columnDefs: [
                                        {
                                            targets: [5], render: function (data, type, row) {

                                                if (data != null) {
                                                    moment.locale('es');
                                                    var dateMoment = moment(data);
                                                    return dateMoment.format("DD-MMM-YYYY HH:mm");
                                                }
                                                else {
                                                    return '';
                                                }
                                            }
                                        }
                                    ],

                                    select: {
                                        style: 'single'
                                    },

                                    "language": {
                                        "url": "assets/js/Spanish.json"
                                    },

                                    "lengthMenu": [[50, 100, 250, -1], [50, 100, 250, "All"]],

                                    "bSort": false
                                });

                        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

                        new $.fn.dataTable.Buttons($scope.myTable, {
                            buttons: [
                                {
                                    "extend": "csv",
                                    "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to CSV</span>",
                                    "className": "btn btn-white btn-primary btn-bold"
                                }

                            ]
                        });
                        $scope.myTable.buttons().container().appendTo($('.tableTools-container'));

                        var defaultColvisAction = $scope.myTable.button(0).action();
                        $scope.myTable.button(0).action(function (e, dt, button, config) {

                            defaultColvisAction(e, dt, button, config);


                            if ($('.dt-button-collection > .dropdown-menu').length == 0) {
                                $('.dt-button-collection')
                                    .wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
                                    .find('a').attr('href', '#').wrap("<li />");
                            }
                            $('.dt-button-collection').appendTo('.tableTools-container .dt-buttons');
                        });

                        ////

                        setTimeout(function () {
                            $($('.tableTools-container')).find('a.dt-button').each(function () {
                                var div = $(this).find(' > div').first();
                                if (div.length == 1) div.tooltip({ container: 'body', title: div.parent().text() });
                                else $(this).tooltip({ container: 'body', title: $(this).text() });
                            });
                        }, 500);

                        $scope.myTable.on('select', function (e, dt, type, index) {
                            if (type === 'row') {
                                $($scope.myTable.row(index).node()).find('input:checkbox').prop('checked', true);
                            }
                        });
                        $scope.myTable.on('deselect', function (e, dt, type, index) {
                            if (type === 'row') {
                                $($scope.myTable.row(index).node()).find('input:checkbox').prop('checked', false);
                            }
                        });

                    }
                    else {
                        $scope.myTable = $('#dynamic-table').DataTable({
                            destroy: true, "language": {
                                "url": "assets/js/Spanish.json"
                            }
                        });
                    }

                })
                .catch(function (error) {

                    $log.error(error);

                    if (error.data.status == 500) {
                        $scope.process = false;
                        $scope.isDisabled = false;
                    }

                    full.resolve();
                });

            blockUI.stop();

            /////////////////////////////////
            //table checkboxes
            $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

            //select/deselect all rows according to table header checkbox
            $('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function () {
                var th_checked = this.checked;//checkbox inside "TH" table header

                $('#dynamic-table').find('tbody > tr').each(function () {
                    var row = this;
                    if (th_checked) $scope.myTable.row(row).select();
                    else $scope.myTable.row(row).deselect();
                });
            });

            //select/deselect a row when the checkbox is checked/unchecked
            $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
                var row = $(this).closest('tr').get(0);
                if (this.checked)
                    $scope.myTable.row(row).deselect();
                else
                    $scope.myTable.row(row).select();
            });

            $(document).on('click', '#dynamic-table .dropdown-toggle', function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
            });

            $('#dynamic-table').on('click', '#id-btn-dialog2', function (e) {

                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();

                var row = $(this).parents('tr')[0];
                $scope.usuario = $scope.myTable.row(row).data();

                $log.log($scope.usuario);

                $("#dialog-confirm").removeClass('hide').dialog({
                    resizable: false,
                    width: '320',
                    modal: true,
                    title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Confirmar eliminación</h4></div>",
                    title_html: true,
                    buttons: [
                        {
                            html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Si",
                            "class": "btn btn-danger btn-minier",
                            click: function () {

                                securityFactory.eliminar($scope.usuario.idUsuario)
                                    .then(function (data) {

                                        $log.info(data);

                                        $scope.data = data;

                                        if ($scope.data.data.mensaje == 'success') {
                                            swal({
                                                title: 'El usuario se inactivo de forma exitosa',
                                                text: "",
                                                type: 'success',
                                                showCancelButton: false,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Aceptar',
                                                cancelButtonText: 'Cancelar'
                                            }).then((result) => {

                                                if (result.value) {
                                                    $window.location.href = '/usuarios';
                                                }

                                            });
                                        }
                                        else {
                                            swal({
                                                title: 'No se pudo inactivar el usuario solicitado',
                                                text: "Intente más tarde",
                                                type: 'error',
                                                showCancelButton: false,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Aceptar',
                                                cancelButtonText: 'Cancelar'
                                            }).then((result) => {

                                                if (result.value) {
                                                    $window.location.href = '/usuarios';
                                                }

                                            });
                                        }

                                    })
                                    .catch(function (error) {
                                        $log.error(error);
                                        $(this).dialog("close");

                                        swal({
                                            title: 'Ocurrio un error al intentar inactivar al usuario solicitado',
                                            text: "Intente más tarde",
                                            type: 'error',
                                            showCancelButton: false,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Aceptar',
                                            cancelButtonText: 'Cancelar'
                                        }).then((result) => {

                                            if (result.value) {
                                                $window.location.href = '/usuarios';
                                            }

                                        });

                                        full.resolve();
                                    });


                            }
                        }
                        ,
                        {
                            html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; No",
                            "class": "btn btn-minier",
                            click: function () {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });

            });

            $('#dynamic-table').on('click', '#btnEditarBanco', function (e) {

                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();

                $scope.pedirContrasena = true;
                $scope.pedirEstatus = false;

                blockUI.start('Cargando...');

                var row = $(this).parents('tr')[0];

                $scope.usuario = $scope.myTable.row(row).data();
                
                $scope.usuario = {
                    idUsuario: $scope.usuario.idUsuario,
                    usuario: $scope.usuario.usuario,
                    contrasena: '',
                    confirmarcontrasena: '',
                    correo: $scope.usuario.correo,
                    estatus: $scope.usuario.estatus,
                    sexo: $scope.usuario.sexo
                };

                $scope.editarUsuario = true;
                $scope.proceso = 'Editar de Usuario';

                $log.log($scope.usuario.estatus);

                if ($scope.usuario.estatus == true) {
                    $("#estatusActivo").prop("checked", true);
                    $("#estatusInactivo").prop("checked", false);
                }
                else {

                    $log.log('falso');

                    $("#estatusActivo").attr('checked', true);
                    $("#estatusInactivo").attr('checked', false);
                }

                if ($scope.usuario.sexo == true) {
                    $("#sexoMasculino").prop("checked", true);
                    $("#sexoFemenino").prop("checked", false);
                }
                else {
                    $("#sexoMasculino").prop("checked", false);
                    $("#sexoFemenino").prop("checked", true);
                }

                $scope.$apply();

                $('#modalUsuarios').modal('show');
                $('#usuario').focus();
            });

            //override dialog's title function to allow for HTML titles
            $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
                _title: function (title) {
                    var $title = this.options.title || '&nbsp;';
                    if (("title_html" in this.options) && this.options.title_html == true)
                        title.html($title);
                    else title.text($title);
                }
            }));

        }

        $scope.agregarUsuario = function () {
            $scope.editarUsuario = false;
            $scope.pedirContrasena = true;
            $scope.pedirEstatus = true;
            $scope.proceso = 'Alta de Usuario';
            $scope.usuario = {
                idUsuario: 0,
                usuario: '',
                contrasena: '',
                confirmarcontrasena: '',
                correo: '',
                estatus: true,
                sexo: true
            };
            $('#modalUsuarios').modal('show');
            $('#usuario').focus();
        }

        $scope.procesar = function () {

            blockUI.start('Procesando Solicitud...');

            var usuario = jQuery('#usuario').val();
            var contrasena = jQuery('#contrasena').val();
            var confirmarcontrasena = jQuery('#confirmarcontrasena').val();
            var correo = jQuery('#correo').val();
            var estatusActivo = $("#estatusActivo").is(':checked');
            var estatusInactivo = $("#estatusInactivo").is(':checked');
            var sexoMasculino = $("#sexoMasculino").is(':checked');
            var sexoFemenino = $("#sexoFemenino").is(':checked');
            var estatus = false;
            var sexo = false;

            if (usuario == '') {
                blockUI.stop();
                swal('Proporcione un usuario', '', 'warning');
                return false;
            }

            if (contrasena == '') {
                blockUI.stop();
                swal('Proporcione una contraseña', '', 'warning');
                return false;
            }

            if (correo == '') {
                blockUI.stop();
                swal('Proporcione un correo', '', 'warning');
                return false;
            }

            if (usuario.length < 7 || usuario.length > 50) {
                blockUI.stop();
                swal('La longuitud del campo usuario debe ser de 7 a 50 elementos', '', 'warning');
                return false;
            }

            if (contrasena.length < 10 || contrasena.length > 50) {
                blockUI.stop();
                swal('La longuitud del campo usuario debe ser de 7 a 50 elementos', '', 'warning');
                return false;
            }

            if (contrasena != confirmarcontrasena) {
                blockUI.stop();
                swal('Las contraseñas deben coincidir', '', 'warning');
                return false;
            }

            if (estatusActivo == false && estatusInactivo == false) {
                blockUI.stop();
                swal('Proporcione un estatus', '', 'warning');
                return false;
            }

            if (sexoMasculino == false && sexoFemenino == false) {
                blockUI.stop();
                swal('Proporcione un sexo', '', 'warning');
                return false;
            }

            if ($scope.usuarioForm.$invalid) {
                blockUI.stop();
                swal('Proporcione la información solicitada...', 'Verifique', 'warning');
                full.resolve();
                return false;
            }

            if (estatusActivo) {
                estatus = true;
            }
            else 
                if (estatusInactivo) {
                    estatus = false;
                }

            if (sexoMasculino) {
                sexo = true;
            }
            else
                if (sexoFemenino) {
                    sexo = false;
                }

            var idUsuario = 0;

            if ($scope.editarUsuario == true) {
                idUsuario = $scope.usuario.idUsuario;
            }
            
            var usuarioNew = {
                idUsuario: idUsuario,
                usuario: usuario,
                contrasena: contrasena,
                correo: correo,
                estatus: estatus,
                sexo: sexo
            }

            if ($scope.editarUsuario == true) {

                securityFactory.actualizar(usuarioNew)
                    .then(function (data) {
                        $log.info(data);

                        $scope.data = data;

                        if ($scope.data.data.mensaje == 'success') {
                            swal({
                                title: 'El usuario se actualizó exitosamente',
                                text: "",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {

                                if (result.value) {
                                    $window.location.href = '/usuarios';
                                }

                            });
                        }
                        else {
                            swal({
                                title: 'No se pudo actualizar el usuario solicitado',
                                text: "Intente más tarde",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {

                                if (result.value) {
                                    $window.location.href = '/usuarios';
                                }

                            });
                        }

                    })
                    .catch(function (error) {
                        $log.error(error);

                        swal({
                            title: 'No se pudo actualizar el usuario solicitado',
                            text: "Intente más tarde",
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {

                            if (result.value) {
                                $window.location.href = '/usuarios';
                            }

                        });

                        full.resolve();
                    });

            }
            else {

                securityFactory.existe(usuarioNew.usuario)
                    .then(function (data) {
                        $log.info(data);

                        $scope.data = data;

                        if ($scope.data.data.mensaje == 'exist') {
                            $('#usuario').val('');
                            $('#usuario').focus();
                            swal('El usuario ya se encuentra registrado', 'Intente con otro usuario', 'warning');
                            return false;
                        }
                        else {

                            securityFactory.registrar(usuarioNew)
                                .then(function (data) {
                                    $log.info(data);

                                    $scope.data = data;

                                    if ($scope.data.data.mensaje == 'success') {
                                        swal({
                                            title: 'El usuario se registro exitosamente',
                                            text: "",
                                            type: 'success',
                                            showCancelButton: false,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Aceptar',
                                            cancelButtonText: 'Cancelar'
                                        }).then((result) => {

                                            if (result.value) {
                                                $window.location.href = '/usuarios';
                                            }

                                        });
                                    }
                                    else {
                                        swal({
                                            title: 'No se pudo registrar el usuario solicitado',
                                            text: "Intente más tarde",
                                            type: 'error',
                                            showCancelButton: false,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Aceptar',
                                            cancelButtonText: 'Cancelar'
                                        }).then((result) => {

                                            if (result.value) {
                                                $window.location.href = '/usuarios';
                                            }

                                        });
                                    }

                                })
                                .catch(function (error) {
                                    $log.error(error);
                                    full.resolve();
                                });

                        }

                    })
                    .catch(function (error) {
                        $log.error(error);
                        full.resolve();
                    });

            }
        }

        function validateEmail(sEmail) {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(sEmail)) {
                return true;
            }
            else {
                return false;
            }
        }
        $('[name=correo]').on("blur", function (event) {

            var email = $(this).val();

            if (email.length > 0) {
                if (!validateEmail(email)) {
                    $(this).val('');
                    swal('Proporcione un correo válido', '', 'warning');
                    $('#correo').focus();
                    event.preventDefault();
                }
            }

        });
        $('[name=usuario]').keypress(function (e) {
            var v = this.value;
            if (v.length < 50) {
                var code = e.charCode || e.keyCode;
                if (String.fromCharCode(code).match(/^[0-9A-Za-z _]*[0-9A-Za-z][0-9A-Za-z _]*$/))
                    return;
                else
                    if (code === 32)
                        return;
            }
            return false;
        });
        function validateContrasena(valor) {
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{7,}$/;
            return re.test(valor);
        }
        $('[name=contrasena]').on("blur", function (event) {

            var contrasena = $(this).val();

            if (contrasena.length > 0) {
                if (!validateContrasena(contrasena)) {
                    $(this).val('');
                    swal('Proporcione una contraseña válida', '', 'warning');
                    $('#contrasena').focus();
                    event.preventDefault();
                }
            }

        });
        $('[name=confirmarcontrasena]').on("blur", function (event) {

            var contrasena = $(this).val();

            if (contrasena.length > 0) {
                if (!validateContrasena(contrasena)) {
                    $(this).val('');
                    swal('Proporcione una contraseña válida', '', 'warning');
                    $('#confirmarcontrasena').focus();
                    event.preventDefault();
                }
            }

        });
    }
})();