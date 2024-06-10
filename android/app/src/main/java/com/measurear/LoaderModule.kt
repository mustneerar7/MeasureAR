package com.measurear

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.measurear.MainActivity2
import com.measurear.StickerActivity
import com.measurear.views.ArFragment

class LoaderModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "LoaderModule"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun launchARSession() {
        val intent = Intent(
            this.currentActivity,
            MainActivity2::class.java
        )
        this.currentActivity!!.startActivity(intent)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun fetchData(): String {
        val reading: String = ArFragment.READING
        Log.d("moduleReads", reading)
        return reading
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun launchStickerSession() {
        val intent = Intent(
            this.currentActivity,
            StickerActivity::class.java
        )
        this.currentActivity!!.startActivity(intent)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun fetchStickerData(callback: Callback) {
        val reading = StickerActivity.READING
        callback.invoke(reading)
    }
}