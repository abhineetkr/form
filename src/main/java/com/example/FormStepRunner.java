package com.example;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;

public class FormStepRunner {
    public static void main(String[] args) throws Exception {
        String url = "https://formstepmulti.netlify.app/";
        String firstName = System.getProperty("firstName", "John");
        String lastName = System.getProperty("lastName", "Doe");
        String screenshotPath = System.getProperty("screenshot", "/workspace/screenshot.png");

        ChromeOptions options = new ChromeOptions();
        String chromiumBinary = System.getProperty("chromiumBinary", "/usr/bin/chromium-browser");
        options.setBinary(chromiumBinary);
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        WebDriver driver = new ChromeDriver(options);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        try {
            driver.get(url);

            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[name='firstName']")));
            WebElement firstNameInput = driver.findElement(By.cssSelector("input[name='firstName']"));
            WebElement lastNameInput = driver.findElement(By.cssSelector("input[name='lastName']"));
            firstNameInput.clear();
            firstNameInput.sendKeys(firstName);
            lastNameInput.clear();
            lastNameInput.sendKeys(lastName);

            clickNext(wait, driver);
            clickNext(wait, driver);
            clickNext(wait, driver);

            TakesScreenshot ts = (TakesScreenshot) driver;
            byte[] png = ts.getScreenshotAs(OutputType.BYTES);
            Path output = Path.of(screenshotPath);
            Files.write(output, png);
            System.out.println("Saved screenshot to: " + output.toAbsolutePath());
        } finally {
            driver.quit();
        }
    }

    private static void clickNext(WebDriverWait wait, WebDriver driver) {
        By nextButtonSelector = By.xpath("//button[normalize-space()='Next' or normalize-space()='next' or normalize-space()='NEXT']");
        WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(nextButtonSelector));
        nextButton.click();
        wait.until(d -> ((JavascriptExecutor) d).executeScript("return document.readyState").equals("complete"));
    }
}

