var dateRangePickerDia;

/* Defino un nuevo lenguaje para dateRangePicker, llamado "es" */
$.dateRangePickerLanguages['es'] = {
	'selected': 'Seleccionado:',
	'days': 'días',
	'week-1' : 'Lu',
	'week-2' : 'Ma',
	'week-3' : 'Mi',
	'week-4' : 'Ju',
	'week-5' : 'Vi',
	'week-6' : 'Sa',
	'week-7' : 'Do',
	'month-name': ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
};

$(document).ready(function() {
    dateRangePickerDia =  $('input[name="dia"]').dateRangePicker({
        format: 'DD/MM/YYYY',
        startDate: '05/03/2020',
        endDate: '05/05/2020',
        showShortcuts: false,
	    showTopbar: false,
        separator: ' al ',
        language: 'es',
        singleDate : true,
        autoClose: true
    });
});