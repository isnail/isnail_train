<?php
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class plugin_isnail_train {
	function global_header() {
		global $_G;
		$return = '';
		$isnail_vars = $_G['cache']['plugin']['isnail_train'];
		$isnail_list = array_filter(explode('|-|-|', $isnail_vars[data_vars]));
		if(count($isnail_list) < 1){
			return $return;
		}
		$isnail_slider = array();
		foreach ($isnail_list as $isnail_value){
			$tmp = explode('|-|', trim($isnail_value));
			$tmp_list = explode('|--|', trim($tmp[1]));
			$pics = array();
			foreach ($tmp_list as $tmp_value){
				$pic = explode('|||', trim($tmp_value));
				array_push($pics, $pic);
			}
			$tmp[1] = $pics;
			array_push($isnail_slider, $tmp);
		}
		$isnail_target = $isnail_vars[target_vars];
		$isnail_where = $isnail_vars[where_vars] ? unserialize($isnail_vars[where_vars]) : array();
		if(in_array(CURSCRIPT, $isnail_where)){
			include template('isnail_train:index');
		}
		return $return;
	}
}