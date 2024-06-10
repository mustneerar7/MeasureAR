package com.measurear

import android.os.Bundle
import android.view.Gravity
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.activity.viewModels
import com.measurear.viewmodel.ViewModel

public class MainActivity2 : AppCompatActivity() {
    val viewModel : ViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, results: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, results);
        if (!CameraPermissionHelper.hasCameraPermission(this)) {
            val toast = Toast.makeText(this, "Camera permission is needed to run this application", Toast.LENGTH_LONG)
            toast.setGravity(Gravity.CENTER_HORIZONTAL, 0, 0)
            toast.show()
            if (!shouldShowRequestPermissionRationale(this.toString())) {
                "Permission denied with checking Do not ask again";
                CameraPermissionHelper.launchPermissionSettings(this)
            }
            finish()
        }
    }
}