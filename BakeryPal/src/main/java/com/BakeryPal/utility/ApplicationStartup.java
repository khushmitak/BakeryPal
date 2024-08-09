package com.BakeryPal.utility;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        System.out.println(String.format("BakeryPalApplication has started successfully after %s.", event.getTimeTaken().toString()));
    }
}