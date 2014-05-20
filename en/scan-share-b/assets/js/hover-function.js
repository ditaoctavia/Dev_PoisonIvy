$(function() {
  $('#share-text').hover(function() {
    $('#share-icon').css('background-position', '0px -80px');
	$('#share-text').css('color', '#004b91');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-share').show(); 
  }, function() {
	$('#share-icon').css('background-position', '0px 0px');
	$('#share-text').css('color', '#fbd637');
	$('#app-image-ss2').addClass('app-image');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#detail-feature-share').hide(); 
  });	
  $('#connect-text').hover(function() {
    $('#connect-icon').css('background-position', '-120px -80px');
	$('#connect-text').css('color', '#004b91');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-connect').show();
  }, function() {
	$('#connect-icon').css('background-position', '-120px 0px');
	$('#connect-text').css('color', '#fbd637');
	$('#app-image-ss2').addClass('app-image');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#detail-feature-connect').hide();
  });
  $('#email-text').hover(function() {
    $('#email-icon').css('background-position', '-240px -80px');
	$('#email-text').css('color', '#004b91');
	$('#app-image-ss1').addClass('app-image-hover');
	$('#app-image-ss1').removeClass('app-image');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-email').show();
  }, function() {
	$('#email-icon').css('background-position', '-240px 0px');
	$('#email-text').css('color', '#fbd637');
	$('#app-image-ss1').addClass('app-image');
	$('#app-image-ss1').removeClass('app-image-hover');
	$('#app-image-ss2').addClass('app-image');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#detail-feature-email').hide();
  });
  $('#print-text').hover(function() {
    $('#print-icon').css('background-position', '-360px -80px');
	$('#print-text').css('color', '#004b91');
	$('#app-image-ss1').addClass('app-image-hover');
	$('#app-image-ss1').removeClass('app-image');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-print').show();
  }, function() {
	$('#print-icon').css('background-position', '-360px 0px');
	$('#print-text').css('color', '#fbd637');
	$('#app-image-ss1').addClass('app-image');
	$('#app-image-ss1').removeClass('app-image-hover');
	$('#app-image-ss2').addClass('app-image');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#detail-feature-print').hide();
  });
  $('#save-text').hover(function() {
    $('#save-icon').css('background-position', '-480px -80px');
	$('#save-text').css('color', '#004b91');
	$('#app-image-ss1').addClass('app-image-hover');
	$('#app-image-ss1').removeClass('app-image');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-save').show();
  }, function() {
	$('#save-icon').css('background-position', '-480px 0px');
	$('#save-text').css('color', '#fbd637');
	$('#app-image-ss1').addClass('app-image');
	$('#app-image-ss1').removeClass('app-image-hover');
	$('#app-image-ss2').addClass('app-image');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#detail-feature-save').hide();
  });
  $('#app-image-ss1').hover(function() {
    $('#email-icon').css('background-position', '-240px -80px');
	$('#print-icon').css('background-position', '-360px -80px');
	$('#save-icon').css('background-position', '-480px -80px');
	$('#email-text').css('color', '#004b91');
	$('#print-text').css('color', '#004b91');
	$('#save-text').css('color', '#004b91');
	$('#detail-feature-email').show();
	$('#detail-feature-print').show();
	$('#detail-feature-save').show();
  }, function() {
    // on mouseout, reset the background colour
    $('#email-icon').css('background-position', '-240px 0px');
	$('#print-icon').css('background-position', '-360px 0px');
	$('#save-icon').css('background-position', '-480px 0px');
	$('#email-text').css('color', '#fbd637');
	$('#print-text').css('color', '#fbd637');
	$('#save-text').css('color', '#fbd637');
	$('#detail-feature-email').hide();
	$('#detail-feature-print').hide();
	$('#detail-feature-save').hide();
  });
  $('#app-image-ss2').hover(function() {
	$('#share-icon').css('background-position', '0px -80px');
	$('#connect-icon').css('background-position', '-120px -80px');
    $('#email-icon').css('background-position', '-240px -80px');
	$('#print-icon').css('background-position', '-360px -80px');
	$('#save-icon').css('background-position', '-480px -80px');
	$('#share-text').css('color', '#004b91');
	$('#connect-text').css('color', '#004b91');
	$('#email-text').css('color', '#004b91');
	$('#print-text').css('color', '#004b91');
	$('#save-text').css('color', '#004b91');
	$('#detail-feature-share').show();
	$('#detail-feature-connect').show();
	$('#detail-feature-email').show();
	$('#detail-feature-print').show();
	$('#detail-feature-save').show();
  }, function() {
    // on mouseout, reset the background colour
    $('#share-icon').css('background-position', '0px 0px');
	$('#connect-icon').css('background-position', '-120px 0px');
	$('#email-icon').css('background-position', '-240px 0px');
	$('#print-icon').css('background-position', '-360px 0px');
	$('#save-icon').css('background-position', '-480px 0px');
	$('#share-text').css('color', '#fbd637');
	$('#connect-text').css('color', '#fbd637');
	$('#email-text').css('color', '#fbd637');
	$('#print-text').css('color', '#fbd637');
	$('#save-text').css('color', '#fbd637');
	$('#detail-feature-share').hide();
	$('#detail-feature-connect').hide();
	$('#detail-feature-email').hide();
	$('#detail-feature-print').hide();
	$('#detail-feature-save').hide();
  });
    $('#btn-ss1').hover(function() {
    $('#email-icon').css('background-position', '-240px -80px');
	$('#print-icon').css('background-position', '-360px -80px');
	$('#save-icon').css('background-position', '-480px -80px');
	$('#email-text').css('color', '#004b91');
	$('#print-text').css('color', '#004b91');
	$('#save-text').css('color', '#004b91');
	$('#app-image-ss1').addClass('app-image-hover');
	$('#app-image-ss1').removeClass('app-image');
	$('#detail-feature-email').show();
	$('#detail-feature-print').show();
	$('#detail-feature-save').show();

  }, function() {
    // on mouseout, reset the background colour
    $('#email-icon').css('background-position', '-240px 0px');
	$('#print-icon').css('background-position', '-360px 0px');
	$('#save-icon').css('background-position', '-480px 0px');
	$('#email-text').css('color', '#fbd637');
	$('#print-text').css('color', '#fbd637');
	$('#save-text').css('color', '#fbd637');
	$('#app-image-ss1').removeClass('app-image-hover');
	$('#app-image-ss1').addClass('app-image');
	$('#detail-feature-email').hide();
	$('#detail-feature-print').hide();
	$('#detail-feature-save').hide();
  });
  $('#btn-ss2').hover(function() {
	$('#share-icon').css('background-position', '0px -80px');
	$('#connect-icon').css('background-position', '-120px -80px');
    $('#email-icon').css('background-position', '-240px -80px');
	$('#print-icon').css('background-position', '-360px -80px');
	$('#save-icon').css('background-position', '-480px -80px');
	$('#share-text').css('color', '#004b91');
	$('#connect-text').css('color', '#004b91');
	$('#email-text').css('color', '#004b91');
	$('#print-text').css('color', '#004b91');
	$('#save-text').css('color', '#004b91');
	$('#app-image-ss2').addClass('app-image-hover');
	$('#app-image-ss2').removeClass('app-image');
	$('#detail-feature-share').show();
	$('#detail-feature-connect').show();
	$('#detail-feature-email').show();
	$('#detail-feature-print').show();
	$('#detail-feature-save').show();

  }, function() {
    // on mouseout, reset the background colour
    $('#share-icon').css('background-position', '0px 0px');
	$('#connect-icon').css('background-position', '-120px 0px');
	$('#email-icon').css('background-position', '-240px 0px');
	$('#print-icon').css('background-position', '-360px 0px');
	$('#save-icon').css('background-position', '-480px 0px');
	$('#share-text').css('color', '#fbd637');
	$('#connect-text').css('color', '#fbd637');
	$('#email-text').css('color', '#fbd637');
	$('#print-text').css('color', '#fbd637');
	$('#save-text').css('color', '#fbd637');
	$('#app-image-ss2').removeClass('app-image-hover');
	$('#app-image-ss2').addClass('app-image');
	$('#detail-feature-share').hide();
	$('#detail-feature-connect').hide();
	$('#detail-feature-email').hide();
	$('#detail-feature-print').hide();
	$('#detail-feature-save').hide();
  });
});