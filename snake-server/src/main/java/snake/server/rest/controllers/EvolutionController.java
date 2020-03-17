package snake.server.rest.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import snake.server.rest.dto.EvolutionDTO;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/api/evolution")
@Slf4j
public class EvolutionController {

	@GetMapping
	public List<EvolutionDTO> getEvolutions() {
		return Arrays.asList(new EvolutionDTO(2), new EvolutionDTO(3), new EvolutionDTO(5));
	}

	@PostMapping
	public EvolutionDTO createEvolution() {
		return new EvolutionDTO((long) (Math.random() * 1e3));
	}

	@DeleteMapping("/{evolutionId}")
	public EvolutionDTO deleteEvolution(@PathVariable final long evolutionId) {
		return new EvolutionDTO(evolutionId);
	}

}
