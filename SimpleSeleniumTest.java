import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SimpleSeleniumTest {
	public static void main(String[] args) {
		WebDriver driver = null;
		try {
			String browser = System.getProperty("browser", "chrome").toLowerCase();
			boolean headless = Boolean.parseBoolean(System.getProperty("headless", "false"));

			driver = createWebDriver(browser, headless);
			driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
			driver.manage().window().maximize();

			// Navigate to a stable test page
			driver.get("https://example.com");

			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
			WebElement heading = wait.until(
				ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h1"))
			);

			String headingText = heading.getText();
			if (!"Example Domain".equals(headingText)) {
				throw new AssertionError("Unexpected heading: " + headingText);
			}

			System.out.println("TEST PASSED: Found expected heading 'Example Domain'.");
		} catch (Throwable t) {
			System.err.println("TEST FAILED: " + t.getMessage());
			t.printStackTrace();
			System.exit(1);
		} finally {
			if (driver != null) {
				driver.quit();
			}
		}
	}

	private static WebDriver createWebDriver(String browser, boolean headless) {
		switch (browser) {
			case "firefox": {
				org.openqa.selenium.firefox.FirefoxOptions options = new org.openqa.selenium.firefox.FirefoxOptions();
				if (headless) {
					options.addArguments("-headless");
				}
				return new FirefoxDriver(options);
			}
			case "edge": {
				org.openqa.selenium.edge.EdgeOptions options = new org.openqa.selenium.edge.EdgeOptions();
				if (headless) {
					options.addArguments("--headless=new");
					options.addArguments("--disable-gpu");
				}
				return new EdgeDriver(options);
			}
			case "chrome":
			default: {
				org.openqa.selenium.chrome.ChromeOptions options = new org.openqa.selenium.chrome.ChromeOptions();
				if (headless) {
					options.addArguments("--headless=new");
					options.addArguments("--disable-gpu");
					options.addArguments("--window-size=1920,1080");
				}
				return new ChromeDriver(options);
			}
		}
	}
}

